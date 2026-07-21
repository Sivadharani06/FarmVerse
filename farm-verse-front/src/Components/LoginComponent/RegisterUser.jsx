import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerNewUser} from "../../Services/LoginService";
import '../../DisplayView.css';

const RegisterUser=()=>{
  let navigate=useNavigate();
    const [errors,setErrors]=useState({});
    const [farmUser,setFarmUser]=useState({
         username:"",
         password: "",
         personalName:"",
         email:"",
        });
   const [flag,setFlag]=useState(false);
   const [confirmPassword,setConfirmPassword]=useState("");
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
   useEffect(() => {
       setFlag(false);
   }, []);
 
    const createNewUser = (event) => {
     event.preventDefault();
        if(farmUser.password===confirmPassword){
          registerNewUser(farmUser).then((response)=>{
           setFlag(true);
           });
     }
  };
  const  onChangeHandler = (event) =>{
     event.persist();
     setFlag(false);
     const name = event.target.name;
         const value = event.target.value;
        setFarmUser(values =>({...values, [name]: value }));
    };
  const handleValidation = (event) => {
     event.preventDefault();
     let tempErrors = {};
     let isValid = true;
 
     if (!farmUser.username.trim()) {
       tempErrors.username = "User Name is required";
       isValid = false;
     }
 
     if (!farmUser.password.trim()) {
       tempErrors.password = "Password is required";
       isValid = false;
     }
     else if (farmUser.password.length < 5 || farmUser.passwordlength > 10) {
        tempErrors.password="Password must be 5-10 characters long";
       isValid = false;
     }
     else if (farmUser.password!==confirmPassword) {
       tempErrors.password="Both the passwords are not matched";
      isValid = false;
    }
 
   if (!farmUser.personalName.trim()) {
         tempErrors.personalName = "Personal Name is required";
         isValid = false;
     }
 if (!farmUser.email.trim()) {
         tempErrors.email = "Email is required";
         isValid = false;
       }
       else if(!emailPattern.test(farmUser.email)){
         tempErrors.email = "Invalid Email Format";
         isValid = false;
       }
   
       if (!confirmPassword.trim()) {
         tempErrors.confirmPassword = "Confirm Password is required";
         isValid = false;
       }
 
    setErrors(tempErrors);
     if (isValid) {
         createNewUser(event);
     }
   };
   const returnBack=()=>{
   navigate('/');
  }

 
  return(
    <div>
    <div className = ".container">
      <div className = "row">
        <div className = "card col-md-2 offset-md-3 offset-md-3">
          <div className = "login-box">
            <h2 className="text-center"><u>New Farmer Registration</u> </h2>
            <form  method="post">
              <div className = "form-group">
                <label>User Name: </label>
                <input placeholder="username" name="username" className="form-control" value={farmUser.username} onChange={(event) => onChangeHandler(event)} />
                {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
              </div>
              <div className = "form-group">
                <label>Password: </label>
                <input type="password"   name="password" className="form-control" value={farmUser.password} onChange={(event) => onChangeHandler(event)}/>
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
              </div>
              <div className = "form-group">
                <label>Retype your Password: </label>
                <input type="password"   name="confirmPassword" className="form-control" value={confirmPassword} onChange={(event) =>setConfirmPassword(event.target.value)}/>
                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
              </div>
              <div className = "form-group">
                <label>User's Personal Name: </label>
                <input placeholder="personal name" name="personalName" className="form-control" value={farmUser.personalName} onChange={(event) => onChangeHandler(event)} />
                {errors.personalName && <p style={{ color: "red" }}>{errors.personalName}</p>}
              </div>
              <div className = "form-group">
                <label>User Email: </label>
                <input placeholder="email" name="email" className="form-control" value={farmUser.email} onChange={(event) => onChangeHandler(event)} />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </div>
             
                <br/>
                <button className='btn btn-primary' onClick={handleValidation}>Submit</button>
              </form>
              <br/>
            <div>
                 {flag && <p style={{ color: "blue" }}>New User Created...Go For Login:<button className='btn btn-success' onClick={returnBack}>Login</button> </p>}
            </div>
           </div>
          </div>
        </div>
     </div>
    </div>
 


    );
 
};
export default RegisterUser;