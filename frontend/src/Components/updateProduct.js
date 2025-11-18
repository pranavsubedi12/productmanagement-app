
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(()=>{
   getProductDetails();
  },[]);

  const getProductDetails= async()=>{
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers: {
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const updateProduct= async()=>{
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method: 'Put',
      body: JSON.stringify({name, price, category, company}),
      headers:{
        'Content-Type':'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.warn(result);
    navigate('/');
  }

   return(
    <div className="update-product">
      <h1>Update Product</h1>
      <form className="input-box">
      <input type="text" value={name} placeholder="Enter Product Name" onChange={(e)=>{setName(e.target.value)}} />
      
      <br />
      <input type="text" value={price} placeholder="Enter Product Price" onChange={(e)=>{setPrice(e.target.value)}}/> 
     
      <br />
      <input type="text" value={category} placeholder="Enter Product Category" onChange={(e)=>{setCategory(e.target.value)}} />
      
      <br />  
      <input type="text" value={company} placeholder="Enter Product Company" onChange={(e)=>{setCompany(e.target.value)}} />
      
      
      <br />
      <button type="button" onClick={updateProduct}>Update Product</button>
      </form>

    </div>
   )
}

export default UpdateProduct