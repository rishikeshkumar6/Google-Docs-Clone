import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import styles from './Editor.module.css'
import 'quill/dist/quill.snow.css';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const Component = styled.div`
  background: #f5f5f5;
`;

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],

  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
  ['image']
];

const Editor = () => {
  const [content, setContent] = useState('');
  let quillInstance = null; 

  useEffect(() => {
    quillInstance = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions } });

    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      quillInstance.clipboard.dangerouslyPasteHTML(savedContent);
      setContent(savedContent); 
    }

    quillInstance.on('text-change', () => {
      const editorContent = quillInstance.root.innerHTML;
      setContent(editorContent);
    });

    return () => {
      quillInstance.off('text-change'); 
      quillInstance = null; 
    };
  }, []); 

  useEffect(() => {
  
    localStorage.setItem('editorContent', content);
  }, [content]);

  return (
    
    <Component>
      <Box id="container" className={styles.container}></Box>
    </Component>
  );
};

export default Editor;
