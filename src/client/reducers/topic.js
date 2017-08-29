// import * as Types from '../constants/ActionTypes';
// const cons = {
//     selected : 1,
//     topics : []
// };
//
// export default function topics(state = cons, action) {
//     switch (action.type) {
//         case Types.ADD_TOPIC:
//             return {
//                 selected: state.selected,
//                 topics : [...state.topics,...action.topics]
//             };
//         case Types.SELECTED_TOPIC:
//             return {
//                 selected: action.selected,
//                 topics : state.topics
//             };
//         default:
//             return state;
//     }
// }