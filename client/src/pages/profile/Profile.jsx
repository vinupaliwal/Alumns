import axios from "axios";
import React, { useEffect, useState } from "react";
import Feed from '../../components/feed/Feed'
import RightBar from '../../components/rightbar/RightBar'
import SideBar from '../../components/sidebar/SideBar'
import Topbar from "../../components/topbar/Topbar"
import "./Profile.css";
import {useParams} from 'react-router';

const Profile = () => {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 const [user,setUser] = useState({});
 const username = useParams().username;
 
 useEffect(()=>{
	const fetchUser=async()=>{
	   const res = await axios.get(`/users?username=${username}`) 
	   setUser(res.data);
	   console.log(res.data.username);
	}
	fetchUser();
},[username])
  return( 
  <>
      <Topbar  />
      <div className="profile">
      <SideBar />
	  	<div className="profileRight">
			<div className="profileRightTop">
				<div className="profileCover">
				<img className="profileCoverImg" src={user.coverPicture || PF+"person/noAvtar.png"} alt="" />
				<img className="profileUserImg" src={user.profilePicture?PF+user.profilePicture : PF+"person/noAvtar.png"} alt="" />
				</div>
				<div className="profileInfo" >
					<h4 className="profileInfoName">{user.username}</h4>
					<span className="profileInfoDesc" >{user.desc}</span>
				</div>
			</div>
			<div className="profileRightBottom">
			   <Feed username={username}/>
               <RightBar user={user} />
			</div>
		</div>
      </div>
  </>
  )
};

export default Profile;
