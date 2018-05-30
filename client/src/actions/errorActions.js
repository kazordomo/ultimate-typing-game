//TODO: anti-pattern deluxe. every CLEAN_ERROR in all the reducers will trigger.
//create a proper error component.
export const CLEAN_ERROR = 'CLEAN_ERROR';

export const cleanError = () => dispatch =>
    dispatch({ type: CLEAN_ERROR });