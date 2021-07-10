import React from 'react';
import {NavLink} from "react-router-dom";

const Home = () => {

    return (
        <>
           <div className="container-fluid home">
               <div className="row home_page">
                   <div className="col-lg-6 col-12 home_first">
                        <h4>Welcome</h4>
                        <h2 className="mt-2">TO Mern Stack Project</h2>
                        <button className="btn btn-default mt-3"><NavLink  className="home_btn" exact to="/signup">Register</NavLink></button>
                   </div>
                   <div className="col-lg-4 col-12 home_second">
                        <img src="/images/MERN.png" alt="Loading...." className="fluid-img mt-5 pt-5"/>
                   </div>
               </div>
           </div>
        </>
    )
}

export default Home;