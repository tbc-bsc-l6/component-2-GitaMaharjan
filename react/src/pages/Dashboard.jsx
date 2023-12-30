import React from 'react'
import Overview from '../Admin/Overview'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminLoginpage from '../Admin/LoginAdmin'

const Dashboard = () => {
  const loginInfo = useSelector((state)=>{
    return state.authReducer.signin[1];
  })

  return (
    <>
    {loginInfo.token != "" ?  
    <div>    
    <Overview outlet={
        <>
    <Outlet/></>}/>
    </div> : <AdminLoginpage/>  }

   
   
    </>
  )
}

export default Dashboard
