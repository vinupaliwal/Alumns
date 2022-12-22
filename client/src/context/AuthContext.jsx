import { createContext,useReducer,useEffect} from "react";
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
   const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
   return(
       <AuthContext.Provider 
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}>
        {children}
       </AuthContext.Provider>
   )
}
// {
//     "_id":"6341a0bac4c3f0be7b4c0cac",
//     "username":"Tom","email":"honeysinj@gmail.comm",
//     "password":"$2b$10$XP3cQR4sFITyU.EV.o2Pneh3F3zJF8OEHq3weKbtLD9HEvfsS.ExC",
//     "profilePicture":"","coverPicture":"","followers":[],
//     "followings":["63419b416263e626eedd71b6","6341a0a7c4c3f0be7b4c0caa"],
//     "isAdmin":false,"createdAt":{"$date":{"$numberLong":"1665245370637"}},
//     "updatedAt":{"$date":{"$numberLong":"1665667032839"}},"__v":{"$numberInt":"0"},
//     "desc":"Hello I am Tom","city":"Pune","from":"Indore","relationship":"1"
// }


// {
//     "_id":{"$oid":"6341a0bac4c3f0be7b4c0cac"},
//     "username":"Tom","email":"honeysinj@gmail.comm",
//     "password":"$2b$10$XP3cQR4sFITyU.EV.o2Pneh3F3zJF8OEHq3weKbtLD9HEvfsS.ExC",
//     "profilePicture":"","coverPicture":"","followers":[],
//     "followings":["63419b416263e626eedd71b6","6341a0a7c4c3f0be7b4c0caa"],
//     "isAdmin":false,"createdAt":{"$date":{"$numberLong":"1665245370637"}},
//     "updatedAt":{"$date":{"$numberLong":"1665667032839"}},"__v":{"$numberInt":"0"},
//     "desc":"Hello I am Tom","city":"Pune","from":"Indore","relationship":"1"
// }

// {
//     _id:"6341a0bac4c3f0be7b4c0cac",
//     username:"Tom",email:"tom@gmail.com",
//     profilePicture:"person/2.jpeg",coverPicture:"",followers:[],
//     followings:["63419b416263e626eedd71b6","6341a0a7c4c3f0be7b4c0caa"],
//     isAdmin:false,createdAt:{"$date":{"$numberLong":"1665245370637"}},
//     updatedAt:{"$date":{"$numberLong":"1665667032839"}},__v:{"$numberInt":"0"},
//     desc:"Hello I am Tom",city:"Pune",from:"Indore",relationship:"1"
//     }