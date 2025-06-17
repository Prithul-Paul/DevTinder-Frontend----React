import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constants'
import { useUser } from './contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();


  const handelLogout = async () => {
    await axios.get(BASE_URL + "logout", {withCredentials: true}).then(()=>{
    setUser(null);
    navigate("/login");
  })
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li><a>Settings</a></li>
                <li><a onClick={handelLogout}>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
    </div>
  )
}

export default NavBar