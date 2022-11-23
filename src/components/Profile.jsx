import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

import supabase from '../services/supabase';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const navigate = useNavigate();

  const [ avatarText, setAvatarText ] = useState(null);

  useEffect(() => {
    setAvatarText(JSON.parse(localStorage.getItem('userData')).email.slice(0, 2));
  }, []);

  const logoutUser = async () => {
    let { error } = await supabase.auth.signOut();

    if (!error) {
      localStorage.removeItem('userData');
      navigate('/signin');
    }
  }

  return (
    <div className='profile-container'>
      {  avatarText && <Avatar label={avatarText.toUpperCase()} size="large"/> }
      <Button onClick={logoutUser} className="p-button-link">
        <i className='pi pi-sign-out'></i>
      </Button>
    </div>
  )
}
