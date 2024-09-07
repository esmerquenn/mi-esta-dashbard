import {CKEditor} from "@ckeditor/ckeditor5-react";
import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomUploadAdapter from "./UploadEditor.jsx";

export function MyUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };
}
function PostEditor({ setContent, content }) {
  return (
    <div>
      <CKEditor
        config={{
          extraPlugins: [MyUploadAdapterPlugin],
        }}
        editor={ClassicEditor}
        data={content}
        value={content}
        onChange={(event, editor) => setContent(editor.getData())}
      />
    </div>
  );
}

export default PostEditor;
