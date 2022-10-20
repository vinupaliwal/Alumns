import React from 'react'
import './CloseFriend.css'

const CloseFriend = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
  <li className="sideBarFriend">
  <img src={PF+user.profilePicture} alt="" className="sideBarFriendImg" /> 
  <span className="sideBarFriendName">{user.username}</span>
</li>
  )
}

export default CloseFriend