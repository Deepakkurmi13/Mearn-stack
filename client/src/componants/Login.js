import React , {useState ,  useContext } from "react";
import {NavLink ,useHistory} from "react-router-dom";
import {userContext} from "../App";


const Login = () => {

const history = useHistory();

const { Data }= useContext(userContext);

if(Data ===  true){
   history.push("/");
}



const [userValue ,setUserValue] =  useState({
    email:"",password:""
});

let name ,value;

const setUserData = (e) =>{
 
  name = e.target.name;
  value =e.target.value;
   
  setUserValue({...userValue, [name]:value});

}


const verifyUser = async(e) =>{

    e.preventDefault();

      try{
        const {email ,password} = userValue;

        const res = await fetch("/signin" , {
          
            method : "POST",
            headers : {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,password
            })
        });
        
        const data  = await res.json();
          
        if(res.status === 200){
          history.push("/"); 
          window.location.reload();
        }else if(res.status === 422){
          window.alert(data.error);
        }
      }catch(err){}
}

  return (
    <>
      <section className="signup">
        <div className="container rounded">
          <div className="row mb-5 gy-5 justify-content-center">

            <div className="col-lg-5  order-lg-2 order-1  col-md-10 signup_left">

            <form className="formData mt-5"  method="POST" id="formAllData">
          
          <div className="Signup_heading mb-4">
              <h3>Signin</h3>
            </div>

            <div className="form-group">
              <div className="input-group">
              <label htmlFor="email"> <i className="zmdi zmdi-email"></i></label>
              <input type="email" name="email" id="email" value={userValue.email}  onChange={setUserData}  autoComplete="off" placeholder="Your Email" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
              <label htmlFor="password"><i className="zmdi zmdi-lock"></i></label>
              <input type="text" name="password" id="password" value={userValue.password}  onChange={setUserData}  autoComplete="off" placeholder="Your Password" />
              </div>
            </div>

            <div className="btn_form">
               <button type="submit" onClick={verifyUser} className="btn btn-primary">Login</button>
            </div>
  
          </form>
            </div>
            <div className="col-lg-4 col-md-4 order-lg-1 order-2  signup_right">
              <figure>
                <img src="/images/signin.png" alt="Loading...." className="img-fluid mt-5" />
                <figcaption>Create an Account? <NavLink to="/signup">Register</NavLink></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default Login;
