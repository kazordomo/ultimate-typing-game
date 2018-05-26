import { SHOW_POPUP_MODAL, HIDE_POPUP_MODAL } from '../actions/popupActions';

export default function(state = {
    modals: [],
}, action) {
    switch(action.type) {
        case SHOW_POPUP_MODAL:
            return {
                ...state,
                modals: state.modals.concat(action.payload),
            }
        case HIDE_POPUP_MODAL:
            return {
                ...state,
                modals: state.modals.filter(item => item.id !== action.payload.id),
            }
        default:
            return state;
    }
}