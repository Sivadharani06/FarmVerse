import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { validateUser } from "../../Services/LoginService";
import '../../DisplayView.css';
 
const LoginPage=()=>{
  let navigate=useNavigate();
   const [errors,setErrors]=useState({});
   const [loginData,setLoginData]=useState({
      username :"",
      password:""
 });
 const [flag,setFlag]=useState(true);
 
 
 const validateLogin=(e)=>{
     e.preventDefault();
     validateUser(loginData.username,loginData.password).then((response)=>{
      let reply=String(response.data);
       if(reply==="True" || reply==="true")
          navigate("/farmer-menu");
        else
        setFlag(false);
     });
  }
  
  const  onChangeHandler = (event) =>{
     event.persist();
     setFlag(true);
     const name = event.target.name;
     const value = event.target.value;
     setLoginData(values =>({...values, [name]: value }));
 };

 const handleValidation = (event) => {
     event.preventDefault();
     let tempErrors = {};
     let isValid = true;
 
     if (!loginData.username.trim()) {
       tempErrors.username = "User Name is required";
       isValid = false;
     }
 
     if (!loginData.password.trim()) {
       tempErrors.password = "Password is required";
       isValid = false;
     }
 
     setErrors(tempErrors);
     if (isValid) {
       validateLogin(event);
     }
   };
 
   const registerNewUser=(e)=>{
     navigate('/register');
 }
 
   return(
     <div className="container">
       <div className="login-box">
         <h2 className="text-center">User Login</h2>
         <br/>
         <form>
            <div className="form-group text-left">
               <label>User Name: </label>
               <input placeholder="Enter Username" name="username" className="form-control" value={loginData.username} onChange={onChangeHandler} />
                 {errors.username && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.username}</p>}
           </div>
           <div className="form-group text-left">
               <label>Password: </label>
               <input type="password" placeholder="Enter Password" name="password" className="form-control" value={loginData.password} onChange={onChangeHandler}/>
               {errors.password && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px", textAlign: "left" }}>{errors.password}</p>}
           </div>
           <br/>
           <button className='btn btn-primary w-100' onClick={handleValidation}>Submit</button>
        </form>
        <br/>
        <div>
           {!flag && <p style={{ color: "red", fontWeight: "600" }}>Invalid User Id or Password</p>}
        </div>
        <hr />
        <div>
           <button className='btn btn-info' onClick={(e) => registerNewUser(e)}>Register New User</button>
        </div>
      </div>
    </div>
   );
 
};
export default LoginPage;