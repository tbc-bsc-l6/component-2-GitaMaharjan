import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ToHome() {
  return (
    <div>
    <Navigate to='/home'/>
    </div>
  )
}

export default ToHome
