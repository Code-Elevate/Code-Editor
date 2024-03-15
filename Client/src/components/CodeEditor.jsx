import Editor from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const languages = [
  "javascript",
  "typescript",
  "css",
  "html",
  "json",
  "python",
  "java",
  "php",
  "ruby",
  "c",
  "csharp",
  "cpp",
  "go",
  "lua",
  "swift",
];

const CodeEditor = ({ width, height }) => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("javascript");
  const [socket, setSocket] = useState(null);
  const [monaco, setMonaco] = useState(null);
  const [code, setCode] = useState("// some comment");

  const { id: problemId } = useParams();

  useEffect(() => {
    const s = io("https://realtime-collaborative-codeeditor.onrender.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("code-change", (value) => {
        setCode(value);
      });

      return () => {
        socket.off("code-change");
      };
    }
  }, [socket]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setMonaco(monaco);
  }

  const handleEditorChange = (value, event) => {
    setCode(value);
    socket.emit("code-change", value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const showValue = () => {
    const value = editorRef.current.getValue();
    alert(value);
  };

  return (
    <div
      style={{ width: width, height: height }}
      className={`flex flex-col justify-around border p-3 border-[#333333] bg-[#1E1E1E] dark:bg-gray-800 dark:border-gray-600`}
    >
      <div
        className={`flex w-full h-[50px] sm:bg-[#1E1E1E] border-b border-[#333333]`}
      >
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-auto h-[35px] px-2  bg-[#1E1E1E]  text-gray-200 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-700 rounded-md focus:outline-none  transition duration-300 ease-in-out"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <Editor
        height={`calc(${height} - 90px)`}
        theme="vs-dark"
        defaultLanguage="javascript"
        language={language}
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        className="w-full h-full"
      />
    </div>
  );
};

export default CodeEditor;
