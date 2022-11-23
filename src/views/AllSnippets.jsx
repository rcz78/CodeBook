import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import supabase from "../services/supabase";

export default function AllSnippets() {

  const navigate = useNavigate();

  const [ snippets, setSnippets ] = useState(null);

  useEffect(() => {
    const fetchSnippets = async() => {
      let { data: snippets, error } = await supabase
        .from('snippets')
        .select('*')

      if (!error) {
        setSnippets(snippets);
      }
    }

    fetchSnippets();
  }, []);

  return (
    <div className="all-snippets-container">
      {snippets && snippets.map(snippet => (
        <Card key={snippet.id} title={`Snippet#${snippet.id}`} style={{ width: '25rem', marginBottom: '2em' }}>
          <Button onClick={() => navigate(`/editor/${snippet.id}`)} label="Edit" icon="pi pi-pencil" />
        </Card>
      ))}
    </div>
  )
}
