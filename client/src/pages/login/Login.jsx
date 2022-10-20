import { CircularProgress } from "@mui/material";
import React, { useRef,useContext} from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {
	const email = useRef();
	const password = useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext);
	const handleOnclick = (e)=>{
       e.preventDefault();
       loginCall({email:email.current.value,password:password.current.value},dispatch);
       
	   console.log(user);
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
					<input placeholder="Email" type="email" required className="loginInput" ref={email} />
					<input placeholder="Password" type="password" required minLength={6} className="loginInput" ref={password}/>
					<button className="loginButton" type="submit" disabled={isFetching}>{isFetching?(<CircularProgress color="inherit" size={32}/>):("Log In")}</button>
					<span className="loginForgot">Forgot Password?</span>
					<button className="loginRegisterButton">Create a New Account</button>
				</form>
			</div>
		</div>
	</div>
	</>
  );
};

export default Login;
