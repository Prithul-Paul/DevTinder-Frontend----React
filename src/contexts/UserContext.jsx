import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + 'profile/view', {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (err) {
      setUser(null);
      if (err.response?.status === 401) {
          
          navigate('/login');
      } else {
        console.error("ERROR:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchUser(); // runs on route change
  // }, [location.pathname]);
  useEffect(() => {
    fetchUser(); // runs on route change
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
