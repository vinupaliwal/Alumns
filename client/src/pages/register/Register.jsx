import axios from "axios";
import React, { useRef } from "react";
import {useNavigate} from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const handleOnclick = async(e)=>{
	e.preventDefault();
	if(passwordAgain.current.value!==password.current.value)
	{
		passwordAgain.current.setCustomValidity("Password don't match");
	}else
	{
       const user = {
		  username:username.current.value,
		  email:email.current.value,
		  password:password.current.value
	   }
	   try{
		   const res = await axios.post("/auth/register",user);
		   console.log(res.data);
		   navigate("/");
	   }catch(err){
		  console.log(err);
	   }
	}
 }
  return (
	<>
	<div className="login">
		<div className="loginWrapper">
			<div className="loginLeft">
				<h3 className="loginLogo">Alumns</h3>
				<span className="loginDesc">Powered by Shail Group of Institutions</span>
			</div>
			<div className="loginRight">
				<form className="loginBox" onSubmit={handleOnclick}>
					<input placeholder="Username"  required ref={username} className="loginInput" />
					<input placeholder="Email" type="email" required ref={email} className="loginInput" />
					<input placeholder="Password" type="password" required ref={password} className="loginInput" />
					<input placeholder="Re-type Password" type="password" required ref={passwordAgain} className="loginInput" />
					<button className="loginButton" type="submit">Sign Up</button>
					<button className="loginRegisterButton">Log into Account</button>
				</form>
			</div>
		</div>
	</div>
	</>
  );
};

export default Register;
