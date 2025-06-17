import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useUser } from './contexts/UserContext'


const Body = () => {
  
  return (
    <div className='main-cotainer'>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body