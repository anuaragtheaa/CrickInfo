export default (state = {}, action) => {
    if(action.type ==='FETCH_SCORECARD'){
        return { ...state, scorecard: action.payload };
    }
    return state;
}