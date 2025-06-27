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
import Connections from './Connections'
import Requests from './Requests'
import Signup from './Signup'
import ForgetPassword from './ForgetPassword'
import Chat from './Chat'

function App() {
    return (
      <BrowserRouter basename='/'>
        <UserProvider>
            <Routes>
              <Route path='/' element={<Body/>} >
                <Route path="/" element={<Feed/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forget-password" element={<ForgetPassword/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/connections" element={<Connections/>}/>
                <Route path="/requests" element={<Requests/>}/>
                <Route path="/message/:targetUserId" element={<Chat/>}/>
              </Route>
              {/* <Route path="/login" element={<div>Login Page</div>} /> */}
            </Routes>
        </UserProvider>
      </BrowserRouter>
    );
}

export default App
