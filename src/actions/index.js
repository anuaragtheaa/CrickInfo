import crickapi from '../apis/crickApi'

export const fetchMatches = () => {
    return async ( dispatch ) => {
        const response = await crickapi.get("/matches.php");

        dispatch({ type: 'FETCH_MATCHES', payload: response.data.matchList.matches });
    }
}

export const fetchMatch = (seriesid, matchid) => {
    return async ( dispatch ) => {
        const response = await crickapi.get("/match.php", { params:{seriesid: seriesid, matchid: matchid} });
        
        dispatch({ type: 'FETCH_MATCH', payload: response.data.match });
    }
}
export const fetchScorecard = (seriesid, matchid) => {
    return async ( dispatch ) => {
        const response = await crickapi.get("/scorecards.php", { params:{seriesid: seriesid, matchid: matchid} });

        dispatch({ type: 'FETCH_SCORECARD', payload: response.data });
    }
}

export const fetchCommentary = (seriesid, matchid) => {
    return async ( dispatch ) => {
        const response = await crickapi.get("/comments.php", { params:{seriesid: seriesid, matchid: matchid} });

        dispatch({ type: 'FETCH_COMMENTARY', payload: response.data.commentary.innings });
    }
}