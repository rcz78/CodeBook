import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import illustration from '../assets/website-development.svg';

import supabase from '../services/supabase';

import { useNavigate } from 'react-router-dom';

export default function Signin() {

  const navigate = useNavigate();

  const singinUser = async (e) => {
    e.preventDefault();

    const [ email, password ] = e.target.elements;

    let { data: { user, error }} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      // TODO: Toast with error message
      return;
    }

    localStorage.setItem('userData', JSON.stringify(user));
    navigate('/');

  }

  return (
    <div className="signin-container">
      <img src={illustration} />
      <div className="signin-form-container">
        <h1><i className="pi pi-lock"></i> Signin</h1>
        <form onSubmit={(e) => singinUser(e)} className='signin-form'>
          {/* Email */}
          <span className="p-input-icon-left">
            <i className="pi pi-user" />
            <InputText placeholder="Email" />
          </span>
          <span className="p-input-icon-left">
            <i className="pi pi-lock" />
            <Password toggleMask feedback={false} placeholder='Password' />
          </span>
          <br />
          <span>
            <Button label="Signin" />
            <br />
            <Button onClick={() => navigate('/signup')} label="Create account" className="p-button-link" />
          </span>
        </form>
      </div>
    </div>
  )
}
