import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import illustration from '../assets/website-development.svg';

import supabase from '../services/supabase';

import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const errorToast = useRef(null);

  const signupUser = async (e) => {
    e.preventDefault();

    const [ email, password, repassword ] = e.target.elements;

    if (password.value !== repassword.value) {
      errorToast.current.show({severity: 'error', summary: 'Error', detail: 'Password and re-entered password must be the same'});
      return;
    }

    // Supabase cheating
    let { data: { user, error }} = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorToast.current.show({severity: 'error', summary: 'Error', detail: 'An error occured. Please try again later.'});
      return;
    }

    navigate('/');
  }

  return (
    <div className="signin-container">
      <Toast ref={errorToast} />
      <img src={illustration} />
      <div className="signin-form-container">
        <h1><i className="pi pi-user"></i> Signup</h1>
        <form onSubmit={(e) => signupUser(e)} className='signin-form'>
          {/* Email */}
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText placeholder="Email" />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <Password toggleMask feedback={false} placeholder='Password' />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <Password toggleMask feedback={false} placeholder='Re-enter password' />
          </span>
          <br />
          <span>
            <Button label="Signup" />
            <br />
            <Button onClick={() => navigate('/signin')} label="Already have an account?" className="p-button-link" />
          </span>
        </form>
      </div>
    </div>
  )
}
