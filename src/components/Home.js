import React from 'react';
import { connect } from 'react-redux';

import { fetchMatches } from '../actions';
import history from '../history';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchMatches();
    }

    getScore(match, team) {
        if (match.hasOwnProperty('scores')) {
            return <span>{match.scores[team]}</span>
        }
    }

    matchStatus(time, summary) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var startTime = new Date(time);
        var currentTime = new Date();
        if (startTime > currentTime) {
            return (
                <p style={{ color: '#c09443c9' }}>{days[startTime.getDay()]}, {startTime.getDate()} {months[startTime.getMonth()]} - {startTime.toLocaleTimeString()}</p>
            )
        }
        else {
            return (
                <p style={{ color: '#c09443c9' }}>{summary}</p>
            )
        }
    }

    detailedMatchView(match) {
        if(match.status === "UPCOMING") {
            alert('Match has not started \nSo, Nothing to display');
        }
        else {
            history.push(`/matchDetails/${match.series.id}/${match.id}`)
        }
    }

    matchCard(match) {
        if (!match) {
            return null;
        }
        return (
            <div className="col-md-6 col-sm-12">
                <div className="card" style={{ width: '18rem', padding: '10px' }}>
                    <div className="card-title" style={{ color: '#2dab5f' }}>{match.series.name}</div>
                    <div className="card-content" onClick={ () => this.detailedMatchView(match) }>
                        <div style={{ color: '#d06767' }}>
                            <div className="d-flex">
                                <div className="p-2 align-items-start"><img src={match.homeTeam.logoUrl} style={{ height: '15px', width: '20px' }} alt={match.homeTeam.name} /></div>
                                <div className="p-2 align-items-center">{match.homeTeam.shortName}&emsp;</div>
                                <div className="p-2 align-items-end">{this.getScore(match, 'homeScore')}</div>
                            </div>
                            <div className="d-flex">
                                <div className="p-2 align-items-start"><img src={match.awayTeam.logoUrl} style={{ height: '15px', width: '20px' }} alt={match.homeTeam.name} /></div>
                                <div className="p-2 align-items-center">{match.awayTeam.shortName}&emsp;</div>
                                <div className="p-2 align-items-end">{this.getScore(match, 'awayScore')}</div>
                            </div>
                        </div>
                        {this.matchStatus(match.startDateTime, match.matchSummaryText)}
                    </div>
                </div>
            </div>
        );
    }

    matchList(status) {
        return (
            this.props.matches.map(match => {
                if(match.status === status) {
                    return (
                        <div key={match.id} style={{ padding: '10px' }}>
                            {this.matchCard(match)}
                        </div>
                    );
                }
                return null;
            })
        );
    }

    matchSelectionPlls() {
        return (
            <div>
                <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pillsCompletedTab" data-toggle="pill" href="#completedPills" role="tab" aria-controls="completedPills" aria-selected="true">Recent Matches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pillsInprogressTab" data-toggle="pill" href="#inprogressPills" role="tab" aria-controls="inprogressPills" aria-selected="false">In Progress Matches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="pillsUpcomingTab" data-toggle="pill" href="#upcomingPills" role="tab" aria-controls="upcomingPills" aria-selected="false">Upcoming Matches</a>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="completedPills" role="tabpanel" aria-labelledby="pillsCompletedTab">
                        <div className="row">{this.matchList("COMPLETED")}</div>
                    </div>
                    <div className="tab-pane fade" id="inprogressPills" role="tabpanel" aria-labelledby="pillsInprogressTab">
                        <div className="row">{this.matchList("LIVE")}</div>
                    </div>
                    <div className="tab-pane fade" id="upcomingPills" role="tabpanel" aria-labelledby="pillsUpcomingTab">
                        <div className="row">{this.matchList("UPCOMING")}</div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div >{this.matchSelectionPlls()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { matches: Object.values(state.matches) };
}

export default connect(mapStateToProps, { fetchMatches })(Home);