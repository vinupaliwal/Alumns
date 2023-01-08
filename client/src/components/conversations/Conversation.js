import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './conversation.css';

function Conversation({conversation,currentUser}) {
  const[user,setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members.find((m)=>m!==currentUser._id);
    const getUser = async ()=>{
      try{
        const res = await axios(`/users?userId=${friendId}`);
        setUser(res.data);
        // console.log(res.data);
      }
      catch(err){
        console.log(err);
      }                                       
    }
    getUser();
  },[conversation,currentUser])
  return (
    <>
        <div className='conversation'>
            <img className='conversationImg' src={user?.profilePicture?PF+user.profilePicture : PF+"person/noAvtar.png"} alt=''/>
            <span className='conversationName'>{user?.username}</span>
        </div>
    </>
  )
}

export default Conversation;