import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './JobDescription.module.css';
const JobDescription = (props) => {
  const handleEditorChange = (data) => {
    const htmlData = convertToHTML(data.getCurrentContent());
    props.htmlContent(htmlData);
    props.setState(data);
  };
  return (
    <div>
      <h2 className={styles.heading}>{props.heading}</h2>
      <Editor
        editorState={props.state}
        onEditorStateChange={handleEditorChange}
        wrapperClassName={styles.wrapper_class}
        editorClassName={styles.editor_class}
        toolbarClassName={styles.toolbar_class}
      />
    </div>
  );
};

export default JobDescription;
