import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';


class App extends Component {

  state = {
    users: [],
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

  // this function is called from Search user for empty string
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type }})
    // remove alert after 5 seconds
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  render() {

    const { loading, users } = this.state;

    return (
      <Fragment>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers}  
            showClear={users.length > 0? true : false }
            setAlert={this.setAlert}
          />
          
          <Users loading={ loading } users={ users } />
        </div>
      </Fragment>
    );
  }
}

export default App;
