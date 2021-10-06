import React, {useReducer} from "react";
import axios from "axios";
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import { SEARCH_USERS, GET_USER, CLEAR_USERS, SET_LOADING, GET_REPOS  } from "../types";

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);
    
    // Search users
    const searchUsers = async (text) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GIHUB_CLIENT_SECRET}`);
        dispatch({
            type: SEARCH_USERS,
            payload:res.data.items
        })
        
      }
    
    
    // Get users
    // clear useres
    // Get repos
    // Set loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading }} >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState