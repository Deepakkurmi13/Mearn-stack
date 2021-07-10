import React ,{useEffect,useState ,useContext} from "react";
import { useHistory} from "react-router-dom";
import {userContext} from "../App";

const Contact = () => {

 const history =  useHistory(); 

 const [userData , setData] = useState({
    name:"" ,
    email:"" ,
    phone:"" ,
    message:""
  });

const { Data } = useContext(userContext);

if(Data ===  false){
   history.push("/");
}

const  getDataToken = async() => {

    try{
        const res = await fetch("/contact", {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if(res.status === 200){
            setData({...userData , name:data.name , email:data.email , phone:data.phone});
        }
    }catch(err){
         history.push("/");
    }
}

const handelInput = (e) =>{
  setData({...userData , [e.target.name]:e.target.value });
}

const handelSubmit = async(e) =>{
    e.preventDefault();

    try{

      const  { name, email, phone ,  message} =  userData ;

      const res = await fetch("/sendUpdate", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name, email, phone , message
        })
      });

    const data = await res.json();
  
     if(res.status === 200 ){
         setData({...userData , message:""});
        alert(data.message);
     }else if(res.status === 422){
        alert(data.error);
     }
      
    }catch(err){}
}

useEffect( () => {
    getDataToken();

},[]);


  return (
    <>
    <section className="contact">
        <div className="container justify-content-center align-items-center">
          <div className="row mt-5 pt-2">

            <div className="col-lg-4 col-12 ">
               <div className="contact_details">
                  <i className="zmdi zmdi-code-smartphone"></i>
                  <div className="ml-4">
                    <p>Phone<br></br>
                    {userData.phone}</p>
                  </div>
               </div>
            </div>
            
            
            <div className="col-lg-4 col-12 ">
               <div className="contact_details">
               <i className="zmdi zmdi-email"></i>
                  <div className="ml-4">
                    <p>Email<br></br>
                    {userData.email}</p>
                  </div>
               </div>
            </div>

            
            <div className="col-lg-4 col-12 ">
               <div className="contact_details">
               <i className="zmdi zmdi-account-box"></i>
                  <div className="ml-4">
                    <p>work<br></br>
                    {userData.work}</p>
                  </div>
               </div>
            </div>


          </div>
        </div>
      </section>

 
   
       <section>
           <div className="container">
               <div className="row d-flex  justify-content-center align-items-center">
                  <div className="col-lg-8 col-10 align-items-center contact_bottom">
                  
                  <form  method="POST" className="formData mt-5" id="formAllData">
          
                      <div className="Signup_heading mb-4">
                          <h3>Get In Touch</h3>
                        </div>
              
                        <div className="form-group">
                          <div className="input-group">
                            <input name="name" type="text" name="name" onChange={handelInput} value={userData.name} id="name" autoComplete="off" placeholder="Your name" />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="input-group"> 
                          <input name="email" type="email" name="email" id="email" onChange={handelInput} value={userData.email}  autoComplete="off" placeholder="Your Email" />
                          </div>
                        </div>
              
                        <div className="form-group">
                          <div className="input-group">
                          <input name="number" type="number" name="phone" id="phone" onChange={handelInput} value={userData.phone} autoComplete="off" placeholder="Your Phone" />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="input-group">
                          <textarea name="message" type="text" name="message" rows="3" onChange={handelInput} value={userData.message} cols="50" className="message w-100" autoComplete="off" placeholder="Your Message" />
                          </div>
                        </div>

                        <button type="submit"  onClick={handelSubmit} className="btn btn-primary mt-2 mb-2">Send Message</button>
              
                      </form>
                  </div>
               </div>
           </div>
       </section>


    </>
  );
};

export default Contact;
