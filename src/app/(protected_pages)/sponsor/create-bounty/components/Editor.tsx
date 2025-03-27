// Components
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Bold, icons } from "lucide-react";

// Hooks version of the Class below (done by me)
const WYSIWYGEditor = ({
  editorState,
  setEditorState,
}: {
  editorState: any;
  setEditorState: any;
}) => {
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    return setEditorState(editorState);
  };

  return (
    <div className="editor min-[300px] editorJs">
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            // "fontSize",
            "list",
            // "textAlign",
            // "history",
          ],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["bold", "italic", "underline", "strikethrough"],
            bold: {
              icon: "/images/png/editor/bold1.svg",
              className: "",
            },
            italic: {
              icon: "/images/png/editor/italic.svg",
              className: "",
            },
            underline: {
              icon: "/images/png/editor/underline.svg",
              className: "",
            },
            strikethrough: {
              icon: "/images/png/editor/strikethrough.svg",
              className: "",
            },
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3"],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
          },
          list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["unordered", "ordered"],
            unordered: {
              icon: "/images/png/editor/list-unordered.svg",
              className: "",
            },
            ordered: {
              icon: "/images/png/editor/list-ordered.svg",
              className: "",
            },
          },
          // fontSize: {
          //   options: [12, 14, 16, 18, 24],
          //   className: undefined,
          //   component: undefined,
          //   dropdownClassName: undefined,
          // },
        }}
      />
    </div>
  );
};

export default WYSIWYGEditor;
