import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser, logoutUserAdmin } from '../authentication/authSlice'
import { useNavigate } from 'react-router-dom';
'use client';
import logo from "../assets/logo/goasis-black.png"
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { FaTags, FaComment,FaClipboardList ,FaUserCircle} from 'react-icons/fa';



const Overview = ({outlet}) => {
   const nav = useNavigate();
   const dispatch = useDispatch();
   const [acc, setAcc] = useState(0);
   const [sidebar, setSidebar] = useState(false);
   const changeAcc = (param) =>{
      if(acc === 0){
         setAcc(param);
      }
      else{
         setAcc(0);
      }
   }
   const changeSidebar = () =>{
      setSidebar(true);
   }
   const changeSidebar2 = () =>{
      setSidebar(false);
   }
   const signOut = ()=>{
      localStorage.setItem("loginItem", "");
      dispatch(logoutUserAdmin({fullname: "", email: "", token: "", image: "", type: ""}))
      nav("/adminloginpage");
   }

  return (
   <div className='flex flex-row'>
   <div style={{ margin: 0, padding: 0  }}>
        <Sidebar >
     <div style={{width:"150px", height:"auto"}}>
        <img src={logo}></img>
     </div>
      <Sidebar.Items  >
        <Sidebar.ItemGroup>
          {/* <Link to='/dashboard/charts'> */}
          <Sidebar.Item href="#" icon={HiChartPie}>
            Overview
          </Sidebar.Item>
          {/* </Link> */}
          
          <Link to='/dashboard/products'>
              <Sidebar.Item href="#" icon={HiShoppingBag} >
                Products
              </Sidebar.Item>
          </Link>
          <Link to='/dashboard/category'>
              <Sidebar.Item href="#" icon={FaTags}>
                Category
              </Sidebar.Item>
          </Link>
          <Sidebar.Item href="/dashboard/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaClipboardList}>
          Orders          
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaComment}>
          Reviews          
          </Sidebar.Item>
       

          <Sidebar.Item href="#" icon={FaUserCircle}>
            Profile
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight} onClick={signOut}>
            Sign Out
          </Sidebar.Item>
      
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
    <div style={{flex:'1' ,margin: 10, padding: 20 }} onClick={()=>changeSidebar2()}>

    {outlet}
  </div>
</div>
  )
}

export default Overview
