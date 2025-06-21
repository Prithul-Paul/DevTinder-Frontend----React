import { useState } from 'react'
import NavBar from './NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Body'
import Login from './Login'
import Profile from './Profile'
// import { Provider } from 'react-redux'
// import { store } from './utils/appStore'
import Feed from './Feed'
import { UserProvider } from './contexts/UserContext'


function App() {

  return (
    <>
      {/* <Provider store={store}> */}
        <BrowserRouter basename='/'>
          <UserProvider>
                <Routes>
                  <Route path='/' element={<Body/>} >
                    <Route path="/" element={<Feed/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                  </Route>
                  {/* <Route path="/login" element={<div>Login Page</div>} /> */}
                </Routes>
          </UserProvider>
        </BrowserRouter>
      {/* </Provider> */}
      {/* <NavBar/> */}
      {/* <h1 className="text-3xl font-bold">Hello World!!</h1> */}
    </>
  )
}

export default App
