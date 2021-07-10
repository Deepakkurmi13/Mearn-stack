import React , {useState , useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {userContext} from "../App";

const Signup = () => {

const history = useHistory();

const { Data }= useContext(userContext);

if(Data ===  true){
   history.push("/");
}

  const  [user ,setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cPassword:""
  });


  
  let name ,value;
  const userData = (event) =>{

  name = event.target.name;
  value = event.target.value;
  
  setUser({...user, [name]:value});

  }

 const submitData = async(e) =>{
    
 e.preventDefault();

 const { name,email,phone,work,password,cPassword } = user;

  const res = await fetch("/register" , {
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        name,email,phone,work,password,cPassword 
    })       
  })
   
  const data = await res.json();

  if(res.status === 201){
    window.alert("registration successful");
    history.push("/signin");    
  }
  else{
    window.alert(data.error);     
  }
  
 }

  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="row mb-5 gy-5 justify-content-center">
            <div className="col-lg-6 col-md-6 signup_left">

            <form  method="POST" className="formData mt-5" id="formAllData">
          
          <div className="Signup_heading mb-4">
              <h3>Signup</h3>
            </div>
  
            <div className="form-group">
              <div className="input-group">
                <i className="zmdi zmdi-account material-icons-name"></i>
                <input type="text" name="name" id="name" autoComplete="off"
                  value={user.name}
                  onChange={userData}
                  placeholder="Your name" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
              <label htmlFor="email"> <i className="zmdi zmdi-email"></i></label>
              <input type="email" name="email" id="email" autoComplete="off"
                value={user.email}
                onChange={userData}
                placeholder="Your Email" />
              </div>
            </div>
  
            <div className="form-group">
              <div className="input-group">
               <label htmlFor="phone"> <i className="zmdi zmdi-phone-in-talk"></i></label>
              <input type="number" name="phone" id="phone" autoComplete="off"
                value={user.phone}
                onChange={userData}
                placeholder="Your Phone" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
              <label htmlFor="profession"> <i className="zmdi zmdi-slideshow"></i></label>
              <input type="text" name="work" id="work" autoComplete="off"
                value={user.work}
                onChange={userData}
                placeholder="Your Profession" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
              <label htmlFor="password"> <i className="zmdi zmdi-lock"></i></label>
              <input type="text" name="password" id="password" autoComplete="off"
                value={user.password}
                onChange={userData}
                placeholder="Your Password" />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
              <label htmlFor="cPassword"> <i className="zmdi zmdi-lock"></i></label>
              <input type="text" name="cPassword" id="cPassword" autoComplete="off"
                value={user.cPassword}
                onChange={userData}
                placeholder="Confirm Your Password" />
              </div>
            </div>

            <div className="btn_form">
            <button type="submit" onClick={submitData} className="btn btn-primary mt-4">register</button>
            </div>
  
          </form>
            </div>
            <div className="col-lg-6 col-md-6  signup_right">
              <figure>
                <img src="/images/signup1.png" alt="Loading...." className="img-fluid mt-5" />
                <figcaption>I am already register? <NavLink to="/login"> sign in</NavLink></figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
