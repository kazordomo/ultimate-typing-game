export const SHOW_POPUP_MODAL = 'SHOW_POPUP_MODAL';
export const HIDE_POPUP_MODAL = 'HIDE_POPUP_MODAL';

export const showPopupModal = obj => dispatch => {
    dispatch({ type: SHOW_POPUP_MODAL, payload: obj });
}

export const hidePopupModal = obj => dispatch => {
    dispatch({ type: HIDE_POPUP_MODAL, payload: obj });
}