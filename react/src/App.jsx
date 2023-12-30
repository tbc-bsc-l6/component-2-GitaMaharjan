
import React, {useEffect, useState} from 'react'
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import UserProfilePage from './pages/UserProfilePage';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { loginUser } from './authentication/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import  axios  from 'axios';
import AboutUsPage from './pages/AboutUsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Loader from './customer/Loader';
import PageNotFound from './pages/PageNotFound';
import ContactUsPage from './pages/ContactUsPage';
// import CircularColor from './trial/CircularColor';
import StandardImageList from './trial/StandardImageList';
import Banner from './trial/Banner';
// import Newsletter from './trial/newsletter';
// import Dashboard from './admin/Dashboard';
// import LoginPage from './admin/LoginPage';
// import OverviewPage from './admin/adminlayouts/OverviewPage';
// import ProductPage from './admin/adminlayouts/ProductPage';

import Dashboard from './pages/Dashboard'
import LoginAdmin from './Admin/LoginAdmin';
import Charts from './Admin/Charts';
import Category from './Admin/Category';
import Product from './Admin/Product';
import ProductForm from './Admin/ProductForm';
import CategoryForm from './Admin/CategoryForm';
import Users from './Admin/Users';
import ProductCard from './customer/collections/ProductCard';
import CollectionsPage from './pages/CollectionsPage';
// import EditProduct from './Admin/EditProduct'



const App = () => {
 
  const [isLogin, setIsLogin] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  // console.log(isLogin);
  let tokenInfilestorage = localStorage.getItem("token");
  const loginData = useSelector((state)=>{
    return state.authReducer.signin[0];
  })
  // console.log(tokenInfilestorage)

  useEffect(()=>{
    if(tokenInfilestorage != ''|| tokenInfilestorage != null){
  let url = "http://127.0.0.1:8000/api/authentication";
      let token = tokenInfilestorage;
      let userData= {
        "token": token
      };
      try{
        const data = axios.post(url, userData, { headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },}).then((response) => {
          // console.log("hhahha")
          if(response.data.status==='true'){
            if(response.data.type==='customer'){
              dispatch(loginUser({id: response.data.id, fullname: response.data.fullname, email: response.data.email, token: token, image: response.data.image, type: "customer"}));
              setIsLogin(true); 
            }
            else if(response.data.type==='admin')
              dispatch(loginUser({id: response.data.id, fullname: response.data.fullname, email: response.data.email, token: token, image: response.data.image, type: "admin"}));
          }
          setLoading(false);
          
        }); 

      }catch(e){

        console.log(e);
      }
    
    }
      else{
        dispatch(loginUser({fullname: "", email: "", token: "", image: "", type: ""}));
        setLoading(false);
        setIsLogin(false); 
        // console.log("jajskjaksja")

    
      }
  },[]);
  // console.log(loading)
  return (
    <>
     {/* <Loader/> */}
    {
      loading === true ? <Loader/> :
    <Routes>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path='/contactus' element={<ContactUsPage/>}/>

      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/signin' element={<SignInPage isLogin={isLogin}/>}/>
      <Route path='/aboutus' element={<AboutUsPage/>}/>
      <Route path='/changepassword' element={<ResetPasswordPage/>}></Route>
      <Route path='/userprofile' element={<UserProfilePage/>}/>
      <Route path="/home/:id" element={<CollectionsPage/>}/>

      {/* <Route path='/cir' element={<CircularColor/>}/> */}
      <Route path='/image' element={<StandardImageList/>}/>
      <Route path='/banner' element={<Banner/>}/>

      {/* <Route path='/new' element={<Newsletter/>}/> */}
      


      {/* <Route path='/dashboard' element={<Dashboard/>}/>
        <Route index element={<OverviewPage/>}/>
        <Route path='products' element={<ProductPage/>}/>
      <Route/>
      <Route path='/admin' element={<LoginPage/>}/> */}

{/* **************************************************************************************** */}

    <Route path='/dashboard' element={<Dashboard/>}>
        <Route index element={<Charts/>}/>
        <Route path='products-form' element={<ProductForm/>}/>
        <Route path='products' element={<Product/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='category-form' element={<CategoryForm/>}/>
        {/* <Route path='edit_product/:id' element={<EditProduct/>}/> */}

        <Route path='users' element={<Users/>}/>



      </Route>
    <Route path='adminlogin' element={<LoginAdmin/>}/>

      <Route path='/pro' element={<ProductCard/>}/>



{/* **************************************************************************************** */}



    </Routes>
}
    
    </>
  )
}

export default App;