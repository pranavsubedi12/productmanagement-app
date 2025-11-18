const express = require('express');
const cors = require('cors');
require('./DB/config');
const Product = require('./DB/Product');
const User = require('./DB/User');
const jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';


const app= express();


app.use(express.json());
app.use(cors());

app.post('/register',async(req,res)=>{
  let user= new User(req.body);
  let result= await user.save();
  result = result.toObject();   
  delete result.password;
  delete result.confirmPassword;
  jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token)=>{
      if(err){
        res.send({result:"Something went wrong, please try after sometime."});
      }
    res.send({result, auth: token});
  })
})

app.post('/login',async(req,res)=>{ 
  console.log(req.body);
  if(req.body.password && req.body.email){
  let user =await User.findOne(req.body).select("-password -confirmPassword");
  if(user){
    jwt.sign({user}, jwtKey, {expiresIn:"2h"}, (err, token)=>{
      if(err){
        res.send({result:"Something went wrong, please try after sometime."});
      }
    res.send({user, auth: token});
  })
}else{
    res.send({result:"No User Found"});
  }
}
})

app.post('/add-product',verifyToken, async(req,res)=>{
  let product= new Product(req.body);
  let result= await product.save();
  res.send(result);
});

app.get('/products',verifyToken,async(req, res) =>{
  let products = await Product.find();
  if(products.length>0){
    res.send(products);
  } else{
    res.send({result:"No Products Found"});
  }
});

app.delete('/product/:id',verifyToken,async(req,res)=>{
  const result= await Product.deleteOne({_id:req.params.id});
  res.send(result);
});

app.get('/product/:id', verifyToken, async(req,res)=>{
  let result = await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result);
  }
  else{
    res.send({result:"No Record Found"});
  }

});


app.put('/product/:id', verifyToken, async(req,res)=>{
  let result = await Product.updateOne(
    {_id:req.params.id},{$set:req.body}
  );
  res.send(result);
});

app.get('/search/:key', verifyToken, async(req,res)=>{
  let result = await Product.find({
    "$or":[
      {name:{$regex:req.params.key}}, 
      {category:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
    ]
  });
  res.send(result);
});

function verifyToken(req, res, next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(' ')[1];
    console.warn("Middleware called ", token);
    jwt.verify(token, jwtKey, (err, valid)=>{
      if(err){
        res.status(401).send({result:"Please provide valid token"});  
    
  }
else{
  next();
}})
}else{
    res.status(403).send({result:"Please add token with header"});
  }

  
  
};

const PORT = 5000;
app.listen(PORT, ()=>{
  console.log(`Server is running on port http://localhost:${PORT}`);
})