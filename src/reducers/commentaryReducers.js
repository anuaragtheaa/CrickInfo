export default ( state={}, action ) => {
    if(action.type === 'FETCH_COMMENTARY') {
        return { ...state, commentary: action.payload };
    }
    return state;
}