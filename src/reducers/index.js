import { combineReducers } from 'redux';

import matchReducers from './matchReducers';
import scorecardReducers from './scorecardReducers';
import commentaryReducers from './commentaryReducers';

export default combineReducers({
    matches: matchReducers,
    scorecard: scorecardReducers,
    commentary: commentaryReducers
});