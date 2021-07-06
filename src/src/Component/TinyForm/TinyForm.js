import React, { useRef } from 'react';
import "./TinyForm.css";

import { Editor } from '@tinymce/tinymce-react';


 export default function TinyForm(props) {
   const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
    //    console.log(editorRef.current.getContent());
        // let res = editorRef.current.getContent();
        let res = editorRef.current.getContent({ format: "css"});
        editorRef.current.value = "";
        return res;
       
     } else {
        return null;
     }
   };
   return (
     <div className="tiny-form">
       <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue=""
         init={{
            selector: 'textarea',  // change this value according to your HTML
            resize: false,          
            // height: 120,
            menubar: false,
            codesample_global_prismjs: true,
            plugins: [
                "advlist autolink link image lists charmap print " +
				"preview codesample code emoticons textcolor"
            ],
            toolbar: 'undo redo | styleselect | bold italic | link imageupload | codesample code | forecolor backcolor emoticons | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
       <button onClick={() => props.sendMessage(log())} id="btnSend">ENTER</button>
     </div>
   );
 }
