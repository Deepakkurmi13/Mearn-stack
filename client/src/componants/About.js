import React ,{useEffect,useState} from "react";
import {useHistory} from "react-router-dom";

const About = () => {

const [userData , setData] = useState({});

const history = useHistory();



const  getDataToken = async() => {

    try{
        const res = await fetch("/about", {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if(res.status === 200){
            setData(data);
        }
    }catch(err){
         history.push("/");
    }
}

useEffect( () => {
    getDataToken();
    return () =>{
        setData({});
    }
},[]);


  return (
    <>
     <div className="container about">
        <form method="GET">
          <div className="row about_page mt-lg-5 mt-2 pt-lg-5 pt-2">

              <div className="col-lg-3 col-12 order-lg-1 order-md-1 order-1  about_first">
                <img src="/images/logo.png" alt="Loading...." className="fluid-img" />
              </div>

              <div className="col-lg-5 col-12 order-lg-2 order-md-3 order-3 about_second">
                <div className="user_info text-center mt-3">
                  <p>{userData.name}</p>
                 <p>
                    <span className="text-info">{userData.work}</span>
                  </p>
                  <p className="text-info">RANKINGS : 1/10</p>

                  <ul className="nav nav-tabs mt-lg-5 mt-2 pt-lg-3 pt-2 " role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="profile-tab" data-toggle="tab" role="tab" href="#profile" >
                        Timeline
                      </a>
                    </li>
                  </ul>

                    <div className="row mt-5 about_data">
                        <div className="col-lg-8 col-8 pl-lg-4 about_info">    
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                   
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="text-info">{userData._id}</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="text-info">{userData.name}</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="text-info">{userData.email}</label>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="text-info">{userData.phone}</label>
                                        </div>
                                    </div>

                                    
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="text-info">{userData.work}</label>
                                        </div>
                                    </div>

                                </div>
                            
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                   
                                   <div className="row">
                                       <div className="col-md-6">
                                           <label>Experience</label>
                                       </div>
                                       <div className="col-md-6">
                                           <label className="text-info">Expert</label>
                                       </div>
                                   </div>

                                   <div className="row">
                                       <div className="col-md-6">
                                           <label>Haurly Rate</label>
                                       </div>
                                       <div className="col-md-6">
                                           <label className="text-info">10$/hr</label>
                                       </div>
                                   </div>

                                   <div className="row">
                                       <div className="col-md-6">
                                           <label>Total Project</label>
                                       </div>
                                       <div className="col-md-6">
                                           <label className="text-info">123</label>
                                       </div>
                                   </div>

                                   <div className="row">
                                       <div className="col-md-6">
                                           <label>English Level</label>
                                       </div>
                                       <div className="col-md-6">
                                           <label className="text-info">Good</label>
                                       </div>
                                   </div>

                                   
                                   <div className="row">
                                       <div className="col-md-6">
                                           <label>Availability</label>
                                       </div>
                                       <div className="col-md-6">
                                           <label className="text-info">6 Mouths</label>
                                       </div>
                                   </div>

                               </div>
                            </div> 
                        </div>
                    </div>

                </div>

               </div>
               
            <div className="col-lg-2 col-12 order-lg-3 order-md-2 order-2 mt-2 about_three ">
                <button className="btn btn-success">Edit Profile</button>
              </div>
            </div> 
      </form>
    </div> 
    </>
  );
};

export default About;
