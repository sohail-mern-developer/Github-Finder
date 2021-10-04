import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import axios from 'axios';
import GithubState from './context/github/GithubState';
import './App.css';


class App extends Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // this function is called for clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // this function is caalled from the searchUsers by passing props up
  searchUsers = async (text) => {
    this.setState( {loading: true} );
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIHUB_CLIENT_SECRET}`);
    this.setState( {users: res.data.items, loading: false} );
  }

  // this function is called from the user item component to display user details from github
  getUser = async (usernme) => {
    this.setState( {loading: true} );
    const res = await axios.get(`https://api.github.com/users/${usernme}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIHUB_CLIENT_SECRET}`);
    this.setState( {user: res.data, loading: false} ); 
  }
  
  // this function is called from user.js component to display the latest repos
  getUserRepos = async (usernme) => {
    this.setState( {loading: true} );
    const res = await axios.get(`https://api.github.com/users/${usernme}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIHUB_CLIENT_SECRET}`);
    this.setState( {repos: res.data, loading: false} ); 
  }

  // this function is called from Search user for empty string
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type }})
    // remove alert after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {

    const { loading, users, user, repos } = this.state;

    return (
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className='container'>
              <Alert alert={this.state.alert} />
              <Switch>

                { /*Route for the Home  page */}
                <Route exact path='/' render={ props => (
                  <Fragment>
                    <Search searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers}  
                    showClear={users.length > 0? true : false }
                    setAlert={this.setAlert}
                  />
                  
                    <Users loading={ loading } users={ users } />
                  </Fragment>
                )} />

                { /*Route for the About page */}
                <Route exact path='/about' component={About} />

                {/* Route for user detail pages */}
                <Route exact path='/user/:login' render={ props => (
                  <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />
                )} />
              </Switch>
              
            </div>
          </div>
        </Router>
      </GithubState>
    );
  }
}

export default App;
