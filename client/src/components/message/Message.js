import React, { useContext } from 'react'
import './message.css';
import {format} from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';

function Message({own,message}) {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(message);
  console.log(own);
  return (
    <>
        <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own?PF+user.profilePicture :null}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
    </>
  )
}

export default Message