import React , {useContext } from 'react';
import { userContext } from "../App";
import {NavLink} from "react-router-dom";

const Navbar = () => {

  const { Data }= useContext(userContext);

  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-light">
    
  <NavLink className="navbar-brand" to="/" >
     <span><img src="/images/logo1.png" alt="Loading.." className="img-fluid w-30"/></span>
       <span className="ml-2" >Mern Stack Project</span>
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mx-5 ml-auto">
      <li className="nav-item active">
        <NavLink  exact activeClassName="navbar_link" className="nav-link" to="/">Home</NavLink>
      </li>

     {Data ? 
        <>
          <li className="nav-item">
            <NavLink activeClassName="navbar_link" className="nav-link" to="/contact">contact</NavLink>
          </li>

          <li className="nav-item"> 
            <NavLink activeClassName="navbar_link" className="nav-link" to="/about">Profile</NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="navbar_link" className="nav-link" to="/logout">Logout</NavLink>
          </li>    
        </>    
      :
        <>
          <li className="nav-item">
            <NavLink activeClassName="navbar_link" className="nav-link" to="/login">Login</NavLink>
          </li>
        </>
     }

    </ul>
   
  </div>
</nav>
    </>
  )
}

export default Navbar;
