const {Room, Admin, Message} = require('./models/index');
import moment from 'moment';
//io from namespace '/'
module.exports = (io) => {
    // const socketEmitter = require('socket.io-emitter')({host : process.env.REDIS_HOST ,port : process.env.REDIS_PORT});
    io.of('/chat').on('connection', (socket) => {

        //admin join default room
        socket.on('admin-join-default-room',({},ack) => {
            //phân quyền admin cho socket
            // const admin = await Admin.findOne({id});
            // socket.user = admin;
            // socket.role = 'admin';

            //join room
            socket.join('admin');

            // //emit join okie
            // socket.emit('server-send-join-default-room',{success : true});
            return ack(true);
        });

        /**
         * socket-admin join room when complete constructor room
         */
        socket.on('admin-join-room', (room,ack) => {
            try {
                if (!room) throw new Error('Invalid Input!');

                // join room
                socket.join(room.id);

                // emit broadcast to room admin joined
                // socket.broadcast.to(room.id).emit('server-send-admin-joined',{name : socket.user.name});

                //ack callback
                return ack(true);

            } catch (err) {
                return ack(false);
            }
        });

        /**
         * socket customer
         *     init table customer,
         *     insert first question into table messages
         *     insert room
         *     announce admin : have a new room
         */
        socket.on('client-send-join-room', ({customer,room,topic}) => {
            try {
                //todo: phân quyền customer cho socket

                socket.user = customer;
                socket.role = 'customer';

                //join room has name roomId
                socket.join(room.id);
                //todo: set room for socket
                socket.room = room.id;
                //emit to customer confirm
                socket.emit('server-send-join-room', {
                    success: true
                });

                //todo : send status to admin room that having room's status = 1;
                socket.to('admin')
                    .emit('server-send-inactive-room', {
                        roomId : room.id,
                        topicId : topic.selected,
                        topic: topic.topics.filter(e => e.id === topic.selected)[0].name,
                        customerName: customer.name,
                        createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                        room_id : room.id,
                        customer_name: customer.name,
                        created_at: moment().format('YYYY-MM-DD hh:mm:ss')
                    });
            } catch (err) {

                socket.emit('server-send-authorized', {success: false,message : err.message});
            }

        });

        /**
         * On Listening admin or customer send message
         */
        socket.on('client-send-message', (msg,ack) => {

            let roomId = msg.roomId;
            let senderId = msg.senderId;
            let name = msg.name;
            let message = msg.message.content;
            let type = msg.message.type || 100;


            Message
                .create({room_id : roomId, sender_id :senderId, content: message, message_type:type})
                .then(newMessage => {

                    socket.broadcast.to(roomId).emit('server-send-message', {
                        name, message, type, senderId,
                        messageId : newMessage.id,
                        createdAt: newMessage.created_at,
                        roomId: roomId
                    });


                    return ack({
                        name, message, type, senderId,
                        messageId : newMessage.id,
                        createdAt: newMessage.created_at,
                        roomId: roomId
                    });
                })
                .catch(err => console.log(err.message));
        });

        socket.on('admin-send-action-rating',(room) => {
            let roomId = room.roomId || room.room_id;
            socket.broadcast.to(roomId).emit('server-send-rating');
        });

        //todo : client rating conversation
        socket.on('client-send-rating',(action) => {
            let roomId = action.roomId || action.room_id;
            console.log({roomId});
        });

        //todo : emit broadcast message be typing
        socket.on('client-send-typing', ({roomId}) => {
            socket.broadcast.to(roomId).emit('server-send-typing', {isTyping: true});
        });

        //todo : emit broadcast message be seen
        socket.on('client-send-seen', ({roomId}) => {
            socket.broadcast.to(roomId).emit('server-send-seen', {isSeen: true});
        });


        socket.on('client-request-close', (ack) => {

            //todo: how many socket in socket.room


            //todo : admin and customer exit room -> update rooms status = 3

            Room.update({status: 3}, {where: {id: socket.room}}).then(x => {
                socket.broadcast.to(socket.room).emit('client-close-room');
                return ack({success: true});
            }).catch(err => console.log(err.message));


        });

        socket.on('disconnect', () => {
            console.log(`có người ${socket.id} thoát kết nối nè`);
        });
    });
};
