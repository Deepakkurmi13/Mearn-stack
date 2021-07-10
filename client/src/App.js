import React , {createContext , useState , useEffect} from "react";
import Navbar from "./componants/Navbar";
import Home from "./componants/Home";
import About from "./componants/About";
import Contact from "./componants/Contact";
import Login from "./componants/Login";
import Signup from "./componants/Signup";
import Logout from "./componants/Logout";
import { Switch , Route ,Redirect } from "react-router-dom";
  
const userContext = createContext();

const Router = () =>{
  return (
    <>
     <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} /> 
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
    </>
  )
}

const App = () => {
  
  const [Data , setValue] = useState();

  const [userData , setUserData] = useState([]);

  const UserData = async() =>{ 

    try {
        const res = await fetch("/checkUser" , {
          method:"GET",
          headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
          },
          credentials:"include"
        });  
  
        const data = await res.json();

        if(res.status === 200){
          setValue(true);
          setUserData([...userData , data.phone]);
        }
    }catch(error) {
        setValue(false);

    }         
  }
      
  useEffect( () =>{
    UserData();
  return () =>{
      setUserData([]);
    }
  },[]);

  return (
    <>
     
      <userContext.Provider value={{Data}} >
        <Navbar />
        <Router />
     </userContext.Provider>
     </>
  );
}

export default App;

export {userContext} ;