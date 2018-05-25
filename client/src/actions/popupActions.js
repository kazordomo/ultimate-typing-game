export const SHOW_POPUP_MODAL = 'SHOW_POPUP_MODAL';
export const HIDE_POPUP_MODAL = 'HIDE_POPUP_MODAL';

export const showPopupModal = id => dispatch => {
    console.log(id);
    dispatch({ type: SHOW_POPUP_MODAL });
}

export const hidePopupModal = () => dispatch => {
    dispatch({ type: HIDE_POPUP_MODAL });
}