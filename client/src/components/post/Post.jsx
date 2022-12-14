import React,{useContext, useEffect, useState} from 'react'
import MoreVert from '@mui/icons-material/MoreVert';
import './Post.css';
import axios from 'axios';
import {format} from 'timeago.js';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({post}) => {
	const [like,setLike] = useState(post.likes.length);
	const [isLiked,setIsLiked] = useState(false);
	const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const {user:currentUser} = useContext(AuthContext);

   useEffect(() => {
	   setIsLiked(post.likes.includes(currentUser._id))
   }, [post.likes,currentUser._id])
   

	useEffect(()=>{
		const fetchUser=async()=>{
           const res = await axios.get(`/users?userId=${post.userId}`);
		   setUser(res.data);
		   console.log(res.data);
		}
		fetchUser();
	},[post.userId])

	const likeHandler = ()=>{
		try{
			axios.put("posts/"+post._id+"/like",{userId:currentUser._id})
		}catch(err){}
			setLike(isLiked ? like-1 : like+1);
			setIsLiked(!isLiked)
	}
  return (
	<div className='post'>
		<div className="postWrapper">
			<div className="postTop">
				<div className="postTopLeft">
					<Link to={`profile/${user.username}`}><img className='postProfileImg' src={user.profilePicture?PF+user.profilePicture : PF+"person/noAvtar.png"} alt="" /></Link>
					<span className="postUserName">{user.username}</span>
					<span className="postDate">{format(post.createdAt)}</span>
				</div>
				<div className="postTopRight">
					<MoreVert />
				</div>
			</div>
			<div className="postCenter">
				<span className="postText">{post?.desc}</span>
				<img src={PF+post.img} alt="" className="postImg" />
			</div>
			<div className="postBottom"> 
				<div className="postBottomLeft">
					<img src="/assets/like.png" alt="" className="likeIcon" onClick={likeHandler} />
					<img src="/assets/heart.png" alt="" className="likeIcon" onClick={likeHandler} />
					<span className="postlikeCounter">{like}people like it</span>
				</div>
				<div className="postBottomRight">
					<span className="postCommentText">{post.comment} Comments</span>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Post