import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// CBNavbar

import Header from './components/Header';

import Dashboard from './views/Dashboard';

import Editor from './components/Editor';
import AllSnippets from './views/AllSnippets';

import Signin from './views/Signin';
import Signup from './views/Signup';
import { useState } from 'react';

function App() {

  const [ editorValue, setEditorValue ] = useState('');

  const editorCodeValueChange = (value) => {
    setEditorValue(value);
  }

  return (
    <Router>
      <Header editorValue={editorValue} />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/all" element={<AllSnippets />} />
          <Route path="/editor">
            <Route path="/editor" element={<Editor onEdit={editorCodeValueChange} />} />
            <Route path="/editor/:id" element={<Editor onEdit={editorCodeValueChange} />} />
          </Route>
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

// / dashboard
  // /all
  // /editor /editor/:id
// /singin signin
// /singup signup

export default App
