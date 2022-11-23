import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import supabase from '../services/supabase';

import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ editorValue }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toast = useRef(null);

  const saveSnippet = async () => {
    const { data, error } = await supabase
      .from('snippets')
      .insert([
        { snippet: JSON.stringify(editorValue) },
      ]);

    if (!error) {
      toast.current.show({severity: 'success', summary: 'Success', detail: 'Code snippet saved successfully!'});
    }
  }

  return (
    <div className="header-container">
      <Toast ref={toast} />
      <h1>
        <i className="pi pi-book"></i>
        CodeBook
      </h1>
      <div className="header-action">
        {/* TODO: Missing Save button / Visible only in dashboard */}
        { pathname.includes('editor') && <Button onClick={saveSnippet} label="Save" className="p-button-success" /> }
        { !pathname.includes('editor') && <Button onClick={() => navigate('/editor')} label="Create" className="p-button-primary]" /> }
      </div>
    </div>
  )
}
