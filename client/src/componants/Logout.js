import React,{useEffect , useContext} from 'react';
import {useHistory} from "react-router-dom";
import {userContext} from "../App";

const Logout = () => {
    
const history = useHistory();

const { Data }= useContext(userContext);

if(Data ===  false){
   history.push("/");
}

const uerLogout = async() =>{

try{

    const res = await fetch("/logout" , {
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        credentials:"include"
    });
    
      await res.json();
      
    if(res.status === 200){
        history.push("/");
        window.location.reload();
    }

}catch(err){
    history.push("/");
    window.location.reload();
}    

}

useEffect(() => {
   uerLogout();
},[]);


return (
    <div>
        <p>please Wait...</p>
    </div>
    )
}

export default Logout;
