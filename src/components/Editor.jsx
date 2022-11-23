import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import MonacoEditor from "@monaco-editor/react";

import supabase from "../services/supabase";

export default function Editor({ onEdit }) {

  const { id } = useParams();

  const [ editorValue, setEditorValue ] = useState(null);

  const fetchSnippet = async (id) => {
    let { data: snippets, error } = await supabase
      .from('snippets')
      .select("*")
      .eq('id', id);

    if (!error) {
      setEditorValue(JSON.parse(snippets[0].snippet));
    }
  }

  useEffect(() => {
    if (id) {
      fetchSnippet(id);
    } else {
      setEditorValue('// some comment');
    }
  }, []);

  const handleEditorChange = (value) => {
    onEdit(value);
  }

  return (
    <div className="editor-container">
      {
        editorValue && (
          <MonacoEditor
            height="100%"
            defaultLanguage="javascript"
            defaultValue={editorValue}
            onChange={handleEditorChange}
          />
        )
      }
    </div>
  )
}
