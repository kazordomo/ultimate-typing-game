import { SHOW_POPUP_MODAL, HIDE_POPUP_MODAL } from '../actions/popupActions';

export default function(state = {
    show: false
}, action) {
    switch(action.type) {
        case SHOW_POPUP_MODAL:
            return {
                show: true,
            }
        case HIDE_POPUP_MODAL:
            return {
                show: false,
            }
        default:
            return state;
    }
}