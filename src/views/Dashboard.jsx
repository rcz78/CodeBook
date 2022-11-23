import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

import supabase from '../services/supabase';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dahsboard() {

  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const isUserLogged = async() => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/signin');
        return;
      }

      setIsLogged(true);
    }

    isUserLogged();

  }, []);

  return (
    <>
      {
        isLogged &&
        (
          <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
              <Outlet />
            </div>
          </div>
        )
      }
    </>
  )
}
