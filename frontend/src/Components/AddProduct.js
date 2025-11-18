import React from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const addProduct= async()=>{

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }   
  
    console.warn(name, price, category, company); 
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result= await fetch("http://localhost:5000/add-product",{
      method:'post',
      body:JSON.stringify({name, price, category, company, userId}),
      headers:{ 
        "Content-Type":"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result= await result.json();
    console.warn(result);
    navigate('/');

  }

   return(
    <div className="add-product">
      <h1>Add Product</h1>
      <form className="input-box">
      <input type="text" value={name} placeholder="Enter Product Name" onChange={(e)=>{setName(e.target.value)}} />
      {error && !name && <span className="invalid-input">Enter valid name</span>}
      <br />
      <input type="text" value={price} placeholder="Enter Product Price" onChange={(e)=>{setPrice(e.target.value)}}/> 
      {error && !price && <span className="invalid-input">Enter valid price</span>}
      <br />
      <input type="text" value={category} placeholder="Enter Product Category" onChange={(e)=>{setCategory(e.target.value)}} />
      {error && !category && <span className="input-invalid">Enter valid category</span>}
      <br />  
      <input type="text" value={company} placeholder="Enter Product Company" onChange={(e)=>{setCompany(e.target.value)}} />
      {error && !company && <span className="input-invalid">Enter valid company</span>}
      
      <br />
      <button type="button" onClick={addProduct}>Add Product</button>
      </form>

    </div>
   )
}

export default AddProduct;