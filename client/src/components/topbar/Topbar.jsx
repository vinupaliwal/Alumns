import {React,useContext} from 'react';
import Search from '@mui/icons-material/Search';
import Person from '@mui/icons-material/Person';
import Chat from '@mui/icons-material/ChatBubble';
import Notification from '@mui/icons-material/NotificationsNone';
import "./Topbar.css";
import {Link} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

const Topbar = () => {
	const {user} = useContext(AuthContext);
	console.log(user.email);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
	<div className='topBarContainer'>
		<div className="topBarLeft">
		 <Link to="/" style={{textDecoration:"none"}}><span className="logo">Alumns</span></Link>
		</div>
		<div className="topBarCenter">
			<div className="searchBar">
				<Search className='searchIcon' />
				<input placeholder='Search for friends, posts or videos' className="searchInput" />
			</div>
		</div>
		<div className="topBarRight">
			<div className="topBarLinks">
				<span className="topBarLink">Home</span>
				<span className="topBarLink">TimeLine</span>
			</div>
			<div className="topBarIcons">
				<div className="topBarIconItem">
					<Person/>
				<span className="topBarIconBadge">1</span>
				</div>
				<div className="topBarIconItem">
					<Chat />
				<span className="topBarIconBadge">1</span>
				</div>
				<div className="topBarIconItem">
					<Notification />
				<span className="topBarIconBadge">1</span>
				</div>
			</div>
			<Link to={`/profile/${user.username}`}><img src={user.profilePicture?PF+user.profilePicture : PF+"person/noAvtar.png"} alt="" className='topBarImg' /></Link>
		</div>
	</div>
  )
}

export default Topbar;