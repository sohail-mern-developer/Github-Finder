import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


class User extends Component {
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
    }

    static propTypes = {
        getUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
    }

    render() {
        const { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = this.props.user;

        const { loading } = this.props;

        if (loading) return <Spinner />
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to search results</Link>
                Hireable: { hireable ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times-circle text-danger"></i> }
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="Profile" className="round-img" style={{ width: '150px' }} />
                        <h1>{name}</h1>
                        {location && (
                            <h4>{location}</h4>
                        )}
                        
                    </div>

                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className='btn btn-dark my-1' rel='noreferrer' target='_blank'>GitHub Profile</a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        Username: {login}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {company && (
                                    <Fragment>
                                        Company: {company}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {blog && (
                                    <Fragment>
                                        Website: {blog}
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div> 
                <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers} </div>
                <div className="badge badge-success">Following: {following} </div>
                <div className="badge badge-light">Public Repos: {public_repos} </div>
                <div className="badge badge-dark">Public Gists: {public_gists} </div>
                </div>
            </Fragment>
        )
    }
}

export default User
