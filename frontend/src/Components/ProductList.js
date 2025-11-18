import React, { useEffect } from "react";
import {Link} from 'react-router-dom';  


const ProductList = () =>{
  const [products, setProducts] = React.useState([]);
  
  useEffect(() => {
    getProducts();

  },[]);
  

  const getProducts = async () =>{
    let result = await fetch('http://localhost:5000/products',{
      headers: {
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        
    });

    result = await result.json();
    setProducts(result);
  }
   
  
  const deleteProduct = async(id) =>{
    console.warn(id);
    let result = await fetch(`http://localhost:5000/product/${id}`,{  
      method: 'Delete',
      headers: {
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    if(result){
      getProducts();
    }
  }

  const searchHandle= async(event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers: {
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if(result){
        setProducts(result);
      }
    } else{
      getProducts();
    }
  }

  return(
    
    <div className="product-list">
      <h1>Product Lists</h1>
      <div className="search-container">
        <input type="text" className="search" placeholder="Search Product" onChange={searchHandle} />
        <Link to="/add" className="add-product-btn">+ Add Product</Link>
      </div>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li> 
        <li>Operation </li>
      </ul>
    {
      products.length > 0 ? products.map((item, index)=>
        <ul>
        <li>{index + 1}</li>
        <li>{item.name}</li>
        <li>{item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li> 
        <li className="operations">
          <button className="delete-btn" onClick={()=>{deleteProduct(item._id)}} title="Delete Product">🗑️</button>
          <Link className="edit-btn" to={`/update/${item._id}`} title="Edit Product">✏️</Link>
        </li>
      </ul>
      
      )
      : <h1> No Products Found</h1>
    }
      
    </div>

  )
}

export default ProductList;