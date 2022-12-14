import React, { useContext,useState } from 'react'
import RssFeed from '@mui/icons-material/RssFeed';
import Chat from '@mui/icons-material/ChatBubbleOutline';
import Video from '@mui/icons-material/PlayCircle';
import Group from '@mui/icons-material/Groups';
import Bookmark from '@mui/icons-material/Bookmark';
import Question from '@mui/icons-material/HelpOutline';
import Job from '@mui/icons-material/Work';
import Event from '@mui/icons-material/CalendarToday';
import Course from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Users} from '../../dummyData' 
import './SideBar.css';
import CloseFriend from '../closeFriend/CloseFriend';
import {Link,Navigate} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const SideBar = ({logout}) => {
  const {user} = useContext(AuthContext);
  console.log(logout);
  function logoutSuccess(){
    localStorage.clear();
    window.location.reload();
  }
  return (
	<div className='sideBar'>
    <div className="sideBarWrapper">
      <ul className="sideBarList">
        <li className="sideBarListItem">
          <RssFeed className='sideBarIcon'/>
          <span className="sideBarListItemText">Feed</span>
        </li>
        <li className="sideBarListItem">
          <Chat className='sideBarIcon'/>
          <span className="sideBarListItemText"><Link to={`/messenger`} style={{textDecoration:"none",color:"black"}}>Chats</Link></span>
        </li>
        <li className="sideBarListItem">
          <Video className='sideBarIcon'/>
          <span className="sideBarListItemText">Videos</span>
        </li>
        <li className="sideBarListItem">
          <Group className='sideBarIcon'/>
          <span className="sideBarListItemText">Groups</span>
        </li>
        <li className="sideBarListItem">
          <Bookmark className='sideBarIcon'/>
          <span className="sideBarListItemText">Bookmarks</span>
        </li>
        <li className="sideBarListItem">
          <Question className='sideBarIcon'/>
          <span className="sideBarListItemText">Questions</span>
        </li>
        <li className="sideBarListItem">
          <Job className='sideBarIcon'/>
          <span className="sideBarListItemText">Jobs</span>
        </li>
        <li className="sideBarListItem">
          <Event className='sideBarIcon'/>
          <span className="sideBarListItemText">Events</span>
        </li>
        <li className="sideBarListItem">
          <Course className='sideBarIcon'/>
          <span className="sideBarListItemText">Courses</span>
        </li>
        { !logout?
          <li className="sideBarListItem">
            <ExitToAppIcon className='sideBarIcon'/>
            <span className="sideBarListItemText" onClick={logoutSuccess} style={{cursor:"pointer"}}>Log out</span>
          </li>:null
        }
      </ul>
      <button className='sideBarButton'>Show More</button>
      <hr className='sideBarHr' />
      {/* <ul className="sideBarFriendList">
        {Users.map((u)=>(
          <CloseFriend key={u.id} user={u} />
        ))}
      </ul> */}
    </div>
  </div>
  )
}

export default SideBar