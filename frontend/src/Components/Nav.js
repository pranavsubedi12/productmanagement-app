import React from "react";
import { Link, useNavigate} from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.clear();
    navigate('/signup');
  }


  return (
    <div className="nav-ul">
      <Link to="/">
        <img alt="logo" className="logos" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaV8T1mHJXxM6cCjlyHg2JR4izUUSBDW_Ftg&s"/>
      </Link>
     {auth ? <ul >
      
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/login" onClick={logout}>Logout({JSON.parse(auth).name})</Link></li>
      </ul>
      :
      <ul >
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        
      </ul>
      } 
    </div>
  );
};

export default Nav; 
