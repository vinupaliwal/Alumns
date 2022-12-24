import React from 'react'
import './Online.css'
import { Link } from 'react-router-dom';

const Online = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
	<li className="rightBarFriend">
          <Link
              to={"/profile/" + user.username}
              style={{ textDecoration: "none",color:"black" }}
           >
          <div className="rightBarProfileImgContainer">
            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvtar.png"} alt="" className="rightBarProfileImg" />
          </div></Link>
          <span className="rightBarUserName">{user.username}</span>
          
        </li>
  )
}

export default Online