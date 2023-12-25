import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      i am dashboard   


      <Link to='/admin'>
      <button type='submit'>logout</button>

      </Link>
    </div>
  )
}

export default Dashboard
