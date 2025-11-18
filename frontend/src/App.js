import AddProduct from './Components/AddProduct';
import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import SignUp from './Components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/updateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Nav />
       
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/update/:id' element={<UpdateProduct/>}/>
        <Route path='/logout' element={<h1>Logout Component</h1>}/>
        <Route path='/profile' element={<h1>Profile Component</h1>}/>
        </Route>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
