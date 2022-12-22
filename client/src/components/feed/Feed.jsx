import {React,useEffect,useState,useContext} from 'react'
import Post from '../post/Post';
import Share from '../share/Share';
import { AuthContext } from '../../context/AuthContext';
import './Feed.css';
import axios from 'axios';
import instance from '../../axios/axios';

const Feed = ({username}) => {
   const[posts,setPosts] = useState([]);
   const {user} = useContext(AuthContext);
   console.log(user);
  useEffect(() => {
	const fetchPosts= async()=>{
        const res = username
		?await instance.get("/posts/profile/"+username)
		:await instance.get("/posts/timeline/"+user._id)

		 console.log(res.data[0]);
		 setPosts(res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt)-new Date(p1.createdAt)
		 }));
	}
	fetchPosts();
  },[username,user._id])
  
  return (
	<div className='feed'>
		<div className='feedWrapper'>
			{(!username || username===user.username) && <Share/>}
			{posts.map((p)=>(
				<Post key={p._id} post={p} />
			))}
		</div>
	</div>
  )
}

export default Feed