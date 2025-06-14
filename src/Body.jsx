import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

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