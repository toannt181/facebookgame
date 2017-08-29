let TOKEN = require('../config/token.config');
let request = require('request');
let rp = require('request-promise');
import Customer from '../models/Customer';
import Room from '../models/Room';
import Message from '../models/Message';
import moment from 'moment';

module.exports = (app, io) => {

    app.get('/webhook', function (req, res) {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === TOKEN.APP_TOKEN) {
            console.log("Validating webhook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    });

    app.post('/webhook', function (req, res) {
        var data = req.body;

        console.log('RECEIVE POST WEBHOOK', data, data.entry[0].messaging);

        // Make sure this is a page subscription
        if (data.object === 'page') {

            // Iterate over each entry - there may be multiple if batched
            data.entry.forEach(function (entry) {
                var pageID = entry.id;
                var timeOfEvent = entry.time;

                // Iterate over each messaging event
                entry.messaging.forEach(function (event) {
                    if (event.message) {
                        receivedMessage(event);
                    } else if (event.postback) {
                        receivedPostback(event);
                    } else {
                        console.log("Webhook received unknown event: ", event);
                    }
                });
            });

            // Assume all went well.
            //
            // You must send back a 200, within 20 seconds, to let us know
            // you've successfully received the callback. Otherwise, the request
            // will time out and we will keep trying to resend.
            res.sendStatus(200);
        }
    });

    const exampleImage = 'https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png';

    function receivedMessage(event) {

        const senderID = event.sender.id;
        const recipientID = event.recipient.id;
        const timeOfMessage = event.timestamp;
        const message = event.message;

        console.log("Received message for user %d and page %d at %d with message:",
            senderID, recipientID, timeOfMessage);

        const messageId = message.mid;
        const messageText = message.text;
        const messageAttachments = message.attachments;

        // if (message.quick_reply) {
        //     if (message.quick_reply.payload = 'SELECTED_TOPIC_PAYLOAD') {
        //         sendTextMessage(senderID, `Please wait for supporting ${messageText} issue.`);
        //         return;
        //     }
        // }

        if (messageText) {
            if (messageText === 'test') {
                test();
                return;
            }

            // If we receive a text message, check to see if it matches a keyword
            // and send back the example. Otherwise, just echo the text we received.
            // switch (messageText) {
            //     case 'generic':
            //         sendGenericMessage(senderID);
            //         break;
            //
            //     default:
            //         sendTextMessage(senderID, messageText);
            // }


            // sendTextMessage(senderID, 'Please wait for supporting!!');
            let roomID = findRoom(senderID);

            if (roomID) {

            } else {
                handleNewCustomer({topicName: 'test', fbID: senderID})
            }

            // sendTextMessage()

        } else if (messageAttachments) {
            sendTextMessage(senderID, "Message with attachment received");
        }
    }

    function receivedPostback(event) {
        console.log('POSTBACK', event.postback);
        var senderID = event.sender.id;
        var recipientID = event.recipient.id;
        var timeOfPostback = event.timestamp;

        // The 'payload' param is a developer-defined field which is set in a postback
        // button for Structured Messages.
        const payload = event.postback.payload;

        console.log("Received postback from user %d and page %d with payload %s", senderID, recipientID, payload);

        // Handle postback message
        switch (payload) {
            case 'GET_STARTED_PAYLOAD':
                sendTextMessage('Hello!');
                sendTopicList(senderID);
                return;
            case 'RESPONSE_SELECT_TOPIC_PAYLOAD':
                handleNewCustomer({topicName: event.message.text, fbID: senderID});
                return;
            case 'EMERGENCY_PAYLOAD':
                sendTextMessage(senderID, "Well call you in a minute. ");
                return;
            default:
                console.log('Detect postpone fail');
        }

    }

    function sendTextMessage(recipientId, messageText) {
        const messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                text: messageText
            }
        };

        callSendAPI(messageData);
    }

    function callSendAPI(messageData) {
        console.log('ECHO', messageData);
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {access_token: TOKEN.PAGE_ACCESS_TOKEN},
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                console.log("Successfully sent generic message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.error("Unable to send message.");
            }
        });
    }

    function sendTopicList(recipientId) {
        const messageData = {
            recipient: {
                id: recipientId
            },
            message: {
                "text": 'Please select your topic issue',
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "Technical",
                        "payload": "RESPONSE_SELECT_TOPIC_PAYLOAD",
                    },
                    {
                        "content_type": "text",
                        "title": "Order",
                        "payload": "RESPONSE_SELECT_TOPIC_PAYLOAD",
                    },
                    {
                        "content_type": "text",
                        "title": "Warranty problem",
                        "payload": "RESPONSE_SELECT_TOPIC_PAYLOAD",
                    },
                    {
                        "content_type": "text",
                        "title": "Something Else",
                        "payload": "RESPONSE_SELECT_TOPIC_PAYLOAD"
                    }
                ]
            }
        };

        callSendAPI(messageData);
    }

    async function checkExistRoom(fbID) {
        const customerID = await Customer.findOne({
            attributes: ['id', 'name'],
            where: {
                fb_id: fbID
            }
        });

        if (customerID) {
            console.log('CUSTOMER ID', customerID.dataValues);

            const lastMessage = await Message.findOne({
                attributes: ['id', 'room_id'],
                where: {
                    sender_id: customerID.dataValues.id
                },
                order: [['id', 'DESC']]
            });

            if (lastMessage) {
                console.log('MESSAGE ID', lastMessage.dataValues);
                const room = await Room.findOne({
                    attributes: ['id', 'topic_id', 'status'],
                    where: {
                        id: lastMessage.dataValues.room_id
                    },
                    order: [['id', 'DESC']]
                });

                //Break search complete until here
                if (room) {
                    console.log('Find room id = %s status = %s', room.dataValues.id, room.dataValues.status);
                    return room.dataValues;
                }
            }
        }

        console.log('Check live room: FALSE');

        sendTopicList(fbID);
    }

    async function findRoom(fbID) {
        const room = await Room.findOne({
            attributes: ['id', 'topic_id', 'status'],
            where: {
                fb_id: fbID
            },
            order: [['id', 'DESC']]
        });

        //Break search complete until here
        if (room) {
            console.log('Find room id = %s status = %s', room.dataValues.id, room.dataValues.status);
            if (room.dataValues.status === 1) {
                return room.dataValues;
            }
        }

        return null;
    }

    async function handleNewCustomer({topicName, fbID}) {
        let userInfo = await callGetUserInfo(fbID);

        const name = userInfo.first_name + ' ' + userInfo.last_name;

        const customer = await createCustomer({name, fbID});
        const room = await createRoom(fbID);

        //todo : send status to admin room that having room's status = 1;
        try {
            io.to('admin')
                .emit('server-send-inactive-room', {
                    roomId: room.id,
                    room_id: room.id,
                    // topicId: topic.selected,
                    // topic: topic.topics.filter(e => e.id === topic.selected)[0].name,
                    customerName: name,
                    customer_name: name,
                    createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
                    created_at: moment().format('YYYY-MM-DD hh:mm:ss')
                });
        } catch (err) {
            console.error(err);
        }
    }

    async function createCustomer({name, fbID}) {
        return Customer.create({
            name: name,
            fb_id: fbID,
        }).catch(e => console.error(e));
    }

    async function createRoom(fbID) {
        return Room.create({
            topic_id: 100,
            status: 1,
            fb_id: fbID,
        }).catch(e => console.error(e));
    }

    function callGetUserInfo(fbID) {
        return rp({
            uri: 'https://graph.facebook.com/v2.6/' + fbID,
            qs: {access_token: TOKEN.PAGE_ACCESS_TOKEN},
            method: 'GET',
            json: true
        });
    }

    function saveMessage() {

    }

    let messagelio = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",
                "top_element_style": "large",
                "elements": [
                    {
                        "title": "Classic T-Shirt Collection",
                        "subtitle": "See all our colors",
                        "image_url": "https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png",
                        "buttons": [
                            {
                                "title": "View",
                                "type": "web_url",
                                "url": "https://peterssendreceiveapp.ngrok.io/collection",
                            }
                        ]
                    },
                    {
                        "title": "Classic White T-Shirt",
                        "subtitle": "See all our colors",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
                        }
                    },
                    {
                        "title": "Classic Blue T-Shirt",
                        "image_url": "https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png",
                        "subtitle": "100% Cotton, 200% Comfortable",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/view?item=101",
                        },
                        "buttons": [
                            {
                                "title": "Shop Now",
                                "type": "web_url",
                                "url": "https://peterssendreceiveapp.ngrok.io/shop?item=101",
                            }
                        ]
                    }
                ],
                "buttons": [
                    {
                        "title": "View More",
                        "type": "postback",
                        "payload": "payload"
                    }
                ]
            }
        }
    };

    let messageButton = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "What do you want to do next?",
                "buttons": [
                    {
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Visit Messenger"
                    },
                    {
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Visit Technical"
                    },
                    {
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Visit Teko"
                    },
                ]
            }
        }
    };

    let general = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Welcome to Peter\'s Hats",
                        "image_url": "https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png",
                        "subtitle": "We\'ve got the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            }, {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    },
                    {
                        "title": "Welcome to Peter\'s Hats",
                        "image_url": "https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png",
                        "subtitle": "We\'ve got the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            }, {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    },
                    {
                        "title": "Welcome to Peter\'s Hats",
                        "image_url": "https://files.muzli.space/15171d60fa68877cd717869eb1865bb4.png",
                        "subtitle": "We\'ve got the right hat for everyone.",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://peterssendreceiveapp.ngrok.io/view?item=103",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://petersfancybrownhats.com",
                                "title": "View Website"
                            }, {
                                "type": "postback",
                                "title": "Start Chatting",
                                "payload": "DEVELOPER_DEFINED_PAYLOAD"
                            }
                        ]
                    }
                ]
            }
        }
    };

    let quickrep = {
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Search",
                "payload": "<POSTBACK_PAYLOAD>",
                "image_url": "http://example.com/img/red.png"
            },
            {
                "content_type": "location"
            },
            {
                "content_type": "text",
                "title": "Something Else",
                "payload": "<POSTBACK_PAYLOAD>"
            }
        ]
    };

    function test() {
        // sendTopicList('1403973539672519');
        sendTopicList('1787012918255659');
    }

    // handleNewCustomer({topicName: 'other', fbID: '1403973539672519'});

};
