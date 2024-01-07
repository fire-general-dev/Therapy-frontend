import { useField } from "formik"
import { useEffect, useRef, useState } from "react"

// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold"
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic"
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials"
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph"

const CKEditorComponent = ({
  onChange,
  // editorLoaded,
  name,
  value,
  className,
  ...props
}) => {
  const [field] = useField(props)
  const editorRef = useRef()
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  const [editorLoaded, setEditrorLoaded] = useState(false)
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    }
    setEditrorLoaded(true)
  }, [])

  return (
    <>
      <div className={`text-area ${className}`}>
        {editorLoaded ? (
          <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
              // plugins: [Paragraph, Bold, Italic, Essentials],
              toolbar: [
                "heading",
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "image",
                "imageCaption",
              ],
            }}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor)
            }}
            onChange={(event, editor) => {
              const data = editor.getData()
              onChange(name, data)
              console.log({ event, editor, data })
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor)
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor)
            }}
          />
        ) : (
          <div>loading</div>
        )}
      </div>
      <style jsx>{`
        .text-area input:disabled {
          cursor: not-allowed !important;
        }
        .text-area {
          @apply bg-white p-vw24 text-black-2e4765 text-18pxm md:text-22pxt lg:text-18px;
          textarea {
            @apply max-w-full w-full font-avenirMedium text-18px border-0 outline-none border-b border-b-[#b7b7b7] min-h-135px;
            resize: none;
            &:focus {
              box-shadow: none;
            }
          }
        }
      `}</style>
    </>
  )
}

export default CKEditorComponent
