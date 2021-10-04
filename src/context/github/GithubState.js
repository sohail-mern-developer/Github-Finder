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
    // Get users
    // clear useres
    // Get repos
    // Set loading

    return <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading }} >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState