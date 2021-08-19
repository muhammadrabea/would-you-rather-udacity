import React, {Component, Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading'

import 'semantic-ui-css/semantic.min.css';

import { handleInitialData } from '../actions/shared';
import Navigation from './Navigation';
import HomePage from './HomePage';
import NewQuestion from './NewQuestion';
import LogIn from './LogIn';
import LeaderboardContainer from './LeaderboardContainer';
import Error from './Error'
import ViewQuestion from './viewQuestion';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
      return (
      <Router>
         <Fragment>
           <LoadingBar />
            <Navigation/> 
              {this.props.notAuthenticated === true
                ? (<Route path ='/' component={LogIn}/>)
                :
                <Switch>
                    <Route path ='/' exact component={LogIn}/>
                    <Route path ='/home' exact component={HomePage}/>
                    <Route path ='/add'  exact component={NewQuestion}/>
                    <Route path='/questions/:id' exact component={ViewQuestion} />
                    <Route path='/leaderboard' exact component={LeaderboardContainer} /> 
                    <Route path ='/error' exact component={Error}/>
                  </Switch>
              }
        </Fragment>
    </Router>  
    );
  }
}
  
function mapStateToProps ({authedUser}) {
  return {
    notAuthenticated: authedUser === null
  }
}
export default connect(mapStateToProps)(App)
