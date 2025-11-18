import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); 
    
    useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate('/');
    }
  }, []); // ✅ static dependency array, same every render

  const collectData = async (e) => {
    e.preventDefault(); // 🛑 Stop page reload

    console.warn(name, email, password, confirmPassword);

    try {
      let result = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password, confirmPassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        throw new Error(`Server error: ${result.status}`);
      }

      result = await result.json();
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate('/');
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  return (
    <div className="signup">
      <h1>SignUp</h1>
      <form className="input-box" onSubmit={collectData}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          required
        />
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Your Password"
          required
        />
        <br />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Your Password"
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
