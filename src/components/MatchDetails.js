import React from 'react';
import { connect } from 'react-redux';

import { fetchMatch, fetchScorecard, fetchCommentary } from '../actions';

class MatchDetails extends React.Component {
    state = { displayCommentaryUptoOver: 3 };

    incrementState = () => {
        this.setState((state) => {
            return { displayCommentaryUptoOver: state.displayCommentaryUptoOver + 3}
        });
    }

    componentDidMount() {
        this.props.fetchMatch(this.props.match.params.seriesid, this.props.match.params.matchid);
        this.props.fetchScorecard(this.props.match.params.seriesid, this.props.match.params.matchid);
        this.props.fetchCommentary(this.props.match.params.seriesid, this.props.match.params.matchid);

        if(this.props.matchDetails && this.props.matchDetails.status === "COMPLETED") {
            clearInterval(this.recallComponentDidMount);
        }
    }

    recallComponentDidMount = setInterval(() => { this.componentDidMount() }, 30000);

    componentWillUnmount() {
        clearInterval(this.recallComponentDidMount);
    }

    toLocalTime(time) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var startTime = new Date(time);
        return (
            <span>{days[startTime.getDay()]}, {startTime.getDate()} {months[startTime.getMonth()]} - {startTime.toLocaleTimeString()}</span>
        )
    }

    matchInfo(info) {
        return (
            <div className="card" style={{ padding: '10px' }}>
                <div className="card-title"><b><h3>{info.name}</h3></b></div>
                <div className="card-content">
                    <div >Series: {info.series.name}</div>
                    <div >Venue: {info.venue.name}</div>
                    <div >Date & time : {this.toLocalTime(info.startDateTime)}</div>
                </div>
            </div>
        );
    }

    convertBatsmenArrayToList(array) {
        return (
            array.map(item => {
                return (
                    <tr key={item.id}>
                        <th scope="row">{item.name}</th>
                        <td>{item.howOut}</td>
                        <td>{item.runs}</td>
                        <td>{item.balls}</td>
                        <td>{item.fours}</td>
                        <td>{item.sixes}</td>
                        <td>{item.strikeRate}</td>
                    </tr>
                )
            })
        )
    }

    convertBowlerArrayToList(array) {
        return (
            array.map(item => {
                return (
                    <tr key={item.id}>
                        <th scope="row">{item.name}</th>
                        <td>{item.overs}</td>
                        <td>{item.maidens}</td>
                        <td>{item.runsConceded}</td>
                        <td>{item.wickets}</td>
                        <td>{item.noBalls}</td>
                        <td>{item.wides}</td>
                        <td>{item.economy}</td>
                    </tr>
                )
            })
        )
    }

    displayInning(inning) {
        return (
            <div style={{backgroundColor:'snow'}}>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope='col-3'>Batsman</th>
                            <th scope='col-4'>HowOut</th>
                            <th scope='col-1'>R</th>
                            <th scope='col-1'>B</th>
                            <th scope='col-1'>4s</th>
                            <th scope='col-1'>6s</th>
                            <th scope='col-1'>SR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.convertBatsmenArrayToList(inning.batsmen)}
                        <tr>
                            <th scope="row">Extras</th>
                            <td></td>
                            <td colSpan="5">{inning.extra}( b {inning.bye}, lb {inning.legBye}, w {inning.wide}, nb {inning.noBall} )</td>
                        </tr>
                        <tr>
                            <th scope="row">Total</th>
                            <td></td>
                            <td colSpan="5">{inning.run}( {inning.wicket} wkts, {inning.over} Ov )</td>
                        </tr>
                    </tbody>
                </table><br />
                <table className="table" style={{backgroundColor:'#f7fff6'}}>
                    <thead>
                        <tr>
                            <th scope="col">Bowler</th>
                            <th scope="col">O</th>
                            <th scope="col">M</th>
                            <th scope="col">R</th>
                            <th scope="col">W</th>
                            <th scope="col">NB</th>
                            <th scope="col">WB</th>
                            <th scope="col">ECO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.convertBowlerArrayToList(inning.bowlers)}
                    </tbody>
                </table>
            </div>
        )
    }

    selectionTabHeaderList(innings) {
        return (
            innings.map(inning => {
                if(inning.id === 1) {
                    return (
                        <li className="nav-item" key={inning.id}>
                            <a className="nav-link active" id={`inningTab${inning.id}`} data-toggle="tab" href={`#inningContent${inning.id}`} role="tab" aria-controls={`inningContent${inning.id}`} aria-selected="true">
                                {inning.shortName}&emsp;
                                <span>{inning.run}-{inning.wicket}({inning.over})</span>
                            </a>
                        </li>
                    )
                }
                else {
                    return (
                        <li className="nav-item" key={inning.id}>
                            <a className="nav-link" id={`inningTab${inning.id}`} data-toggle="tab" href={`#inningContent${inning.id}`} role="tab" aria-controls={`inningContent${inning.id}`} aria-selected="false">
                                {inning.shortName}&emsp;
                                <span>{inning.run}-{inning.wicket}({inning.over})</span>
                            </a>
                        </li>
                    )
                }
            })
        )
    }

    selectionTabContentList(innings) {
        return (
            innings.map(inning => {
                if(inning.id === 1) {
                    return (
                        <div key="id" className="tab-pane fade show active" id={`inningContent${inning.id}`} role="tabpanel" aria-labelledby={`innintTab${inning.id}`}>{this.displayInning(inning)}</div>
                    )
                }
                else {
                    return (
                        <div className="tab-pane fade" id={`inningContent${inning.id}`} role="tabpanel" aria-labelledby={`innintTab${inning.id}`} key={inning.id}>{this.displayInning(inning)}</div>
                    )
                }
            })
        )
    }

    scorecardDetail(innings) {
        return (
            <div>
                <div style={{color:'green'}}><b>{this.props.matchDetails.matchSummaryText}</b></div>
                <ul className="nav nav-tabs" id="scordcardTab" role="tablist">
                    {this.selectionTabHeaderList(innings)}
                </ul>
                <div className="tab-content" id="selectionTabContent">
                    {this.selectionTabContentList(innings)}
                </div>
            </div>
        );
    }

    convertBallsArrayToList(balls, overNumber) {
        return (
            balls.map(ball => {
                return (
                    <tr key={ball.id}>
                        <th scope="row">{overNumber}.{ball.ballNumber}</th>
                        <td>{ball.comments[0].text}</td>
                    </tr>
                )
            })
        )
    }

    commentaryPerOver(innings) {
        if(!innings) {
            return null;
        }
        var overs = innings[0].overs;
        if(overs.lenght <= this.state.displayCommentaryUptoOver) {
            this.setState({ displayCommentaryUptoOver: overs.lenght - 2 })
        }
        return (
            overs.slice(0, this.state.displayCommentaryUptoOver).map(over => {
                return (
                    <div key={over.id}>
                        <table className="table">
                            <thead>
                                <tr style={{backgroundColor:'#edffe1'}}>
                                    <th scope="col">Over: {over.number }</th>
                                    <th scope="col"> Runs: {over.overSummary.runsConcededinOver}<br />{over.overSummary.extrasConcededinOver}</th>
                                </tr>
                            </thead>
                            <tbody style={{backgroundColor:'#fff4f9'}}>
                                {this.convertBallsArrayToList(over.balls, over.number-1)}    
                            </tbody>
                        </table>
                    </div>
                )
            })
        )
    }

    currentlyPerformingBatsmen(batsmen){
        return (
            batsmen.map(batsman => {
                if(batsman.howOut === "not out") {
                    return (
                        <tr key={batsman.id}>
                            <th scope="row">{batsman.name}</th>
                            <td>{batsman.runs}</td>
                            <td>{batsman.balls}</td>
                            <td>{batsman.fours}</td>
                            <td>{batsman.sixes}</td>
                            <td>{batsman.strikeRate}</td>
                        </tr>
                    )
                }
                return null;
            })
        )
    }

    currentlyPerformingBowler(bowlers){
        return (
            bowlers.map(bowler => {
                if(parseFloat(bowler.overs) % 1 > 0) {
                    return (
                        <tr key={bowler.id}>
                            <th scope="row">{bowler.name}</th>
                            <td>{bowler.overs}</td>
                            <td>{bowler.maidens}</td>
                            <td>{bowler.runsConceded}</td>
                            <td>{bowler.wickets}</td>
                            <td>{bowler.economy}</td>
                        </tr>
                    )
                }
                return null;
            })
        )
    }

    matchSummary(inning) {
        if(this.props.matchDetails.status === "COMPLETED") {
            return (
                <div >
                    <div className="card" style={{backgroundColor:'white', padding:'15px'}}>
                        <div>Man of The Match: <b><i>{this.props.scorecard.fullScorecardAwards.manOfTheMatchName}</i></b></div>
                        <div>Most Runs:&emsp;&emsp;&emsp; <b><i>{this.props.scorecard.fullScorecardAwards.mostRunsAward.name}</i></b></div>
                        <div>Most Wickets:&emsp;&nbsp;&nbsp; <b><i>{this.props.scorecard.fullScorecardAwards.mostWicketsAward.name}</i></b></div>
                    </div>
                </div>
            )
        }
        else if (this.props.matchDetails.status === "LIVE"){
            return (
                <div className="card" style={{padding:'10px'}}>
                    <div className="card-title"><b>{inning.team.shortName}</b> {inning.run}-{inning.wicket}({inning.over})</div>
                    <div className="card-content">
                        <table className="table" style={{backgroundColor:'#f9ffff'}}>
                            <thead>
                                <tr>
                                    <th scope="col">Batsman</th>
                                    <th scope="col">R</th>
                                    <th scope="col">B</th>
                                    <th scope="col">4s</th>
                                    <th scope="col">6s</th>
                                    <th scope="col">SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.currentlyPerformingBatsmen(inning.batsmen)}
                            </tbody>
                        </table>
                        <table className="table" style={{backgroundColor:'#fbf9ff'}}>
                            <thead>
                                <tr>
                                    <th scope="col">Bowler</th>
                                    <th scope="col">O</th>
                                    <th scope="col">M</th>
                                    <th scope="col">R</th>
                                    <th scope="col">W</th>
                                    <th scope="col">ECO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.currentlyPerformingBowler(inning.bowlers)}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }

    selectionTab() {
        if(!this.props.scorecard) {
            return null;
        }
        return (
            <div style={{backgroundColor:'#f5f5f5'}}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Commentary</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Scorecard</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div>
                            <div style={{color:'green'}}><b>{this.props.matchDetails.matchSummaryText}</b></div>
                            {this.matchSummary(this.props.scorecard.fullScorecard.innings[0])}
                            {this.commentaryPerOver(this.props.commentary)}
                            <div className="d-flex justify-content-center">
                                <button onClick={ this.incrementState } className="btn btn-primary">View more</button>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div>{this.scorecardDetail(this.props.scorecard.fullScorecard.innings)}</div>
                    </div>
                </div>
            </div>
        );
    }

    matchDetail() {
        if (!this.props.matchDetails) {
            return null;
        }
        return (
            <div>
                {this.matchInfo(this.props.matchDetails)}
                {this.selectionTab()}
            </div>
        )
    }

    render() {
        return (
            <div>{this.matchDetail()}</div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        matchDetails: state.matches[ownProps.match.params.matchid],
        scorecard: state.scorecard.scorecard,
        commentary: state.commentary.commentary
    }
}

export default connect(mapStateToProps, { fetchMatch, fetchScorecard, fetchCommentary })(MatchDetails);