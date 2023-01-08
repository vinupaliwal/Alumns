import {React,useContext,useEffect, useState} from 'react'
import {Users} from '../../dummyData'
import Online from '../online/Online';
import {Link} from 'react-router-dom';
import {Add,Remove} from '@mui/icons-material';
import './RightBar.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const RightBar = ({user}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings?.includes(user?._id));

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/unfollow/${user._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/follow/${user._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightBar = ()=>{
    // const {user} = useContext(AuthContext);
    const[allUser,setAllUser] = useState([]);
    useEffect(() => {
      const getFriends = async () => {
        try {
          const res = await axios.get("/users/allUser");
          setAllUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, []);
    return(
      <>
      <div className="birthdayContainer">
        <img src="/assets/gift.png" alt="" className="birthdayImg" />
        <span className="birthdayText"><b>Viraj Sharma</b> and <b>Ajay Gupta</b> have a birthday  today</span>
      </div>
      <img src="/assets/ad.png" alt="" className="rightbarAd" />
      <h4 className="rightbarTitle">All Alumni</h4>
      <ul className="rightbarFriendList">
        {allUser.map((u)=>(
          <>
          <Online user={u} />
          </>
        ))}
      </ul> 
      </>
    )
  }
  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvtar.png"}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
	<div className='rightbar'>
    <div className="rightbarWrapper">
    {user?<ProfileRightBar/>:<HomeRightBar />}
    </div>
  </div>
  )
}

export default RightBar