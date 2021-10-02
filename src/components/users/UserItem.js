import React from 'react'
import PropTypes from 'prop-types'


const UserItem = ({ user: {login, avatar_url, html_url }}) => {
    
    return (
        <div>
            <div className="card text-center">
                <img src={avatar_url} alt='Profile' className='round-img' style={{ width:'60px' }} />
                <h3>{login}</h3>
                <a href={html_url} target='_blank' rel='noreferrer' className='btn btn-dark btn-sm my-1'>Profile</a>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}


export default UserItem
