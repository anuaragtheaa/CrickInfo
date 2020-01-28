import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import MatchDetails from './MatchDetails';
import history from '../history';

class App extends React.Component {
    render() {
        return (
            <div style={{backgroundImage:"url(https://i.pinimg.com/originals/81/dd/d3/81ddd367e580ac8909ea032cca1a50ca.jpg)"}}>
                <div className="container">
                    <Router history={history}>
                        <div>
                            <Header />
                            <Route path="/" exact component={Home} />
                            <Route path="/matchDetails/:seriesid/:matchid" exact component={MatchDetails} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;