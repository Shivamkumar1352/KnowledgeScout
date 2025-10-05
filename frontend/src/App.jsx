// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [docId, setDocId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const backendURL = "http://localhost:5001/api";

//   // Upload file
//   const handleUpload = async () => {
//   if (!file) return alert("Please select a file");
//   setLoading(true);

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     console.log("Sending file:", file);
//     const res = await axios.post(`${backendURL}/upload`, formData);
//     console.log("Response:", res.data);
//     setDocId(res.data.docId);
//   } catch (err) {
//     console.error("Upload error:", err);
//     alert("Failed to upload file");
//   } finally {
//     setLoading(false);
//   }
// };


//   // Ask question
//   const handleAskQuestion = async () => {
//     if (!docId || !question) return alert("Document ID or question missing");
//     setLoading(true);
//     try {
//       const res = await axios.post(`${backendURL}/question`, {
//         docId,
//         question,
//       });
//       setAnswer(res.data.answer);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to get answer");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-6">KnowledgeScout</h1>

//       {/* File Upload */}
//       <div className="mb-4">
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border p-2 rounded"
//         />
//         <button
//           onClick={handleUpload}
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Upload
//         </button>
//       </div>

//       {/* Document ID (auto-filled after upload) */}
//       {docId && (
//         <div className="mb-4">
//           <p>
//             <strong>Document ID:</strong> {docId}
//           </p>
//         </div>
//       )}

//       {/* Question Input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask a question about the document"
//           className="border p-2 rounded w-80"
//         />
//         <button
//           onClick={handleAskQuestion}
//           className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Ask
//         </button>
//       </div>

//       {/* Answer Display */}
//       {loading && <p className="text-gray-500">Loading...</p>}
//       {answer && (
//         <div className="mt-4 p-4 bg-white rounded shadow w-96">
//           <strong>Answer:</strong>
//           <p className="mt-2">{answer}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = "http://localhost:5001/api";

  // Upload file
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Sending file:", file);
      const res = await axios.post(`${backendURL}/upload`, formData);
      console.log("Response:", res.data);
      setDocId(res.data.docId);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  // Ask question
  const handleAskQuestion = async () => {
    if (!docId || !question) return alert("Document ID or question missing");
    setLoading(true);
    try {
      const res = await axios.post(`${backendURL}/question`, {
        docId,
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      alert("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">
          KnowledgeScout
        </h1>

        {/* File Upload */}
        <div className="flex items-center mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="flex-1 border border-gray-600 bg-gray-700 text-gray-200 rounded p-2"
          />
          <button
            onClick={handleUpload}
            className="ml-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>

        {/* Document ID */}
        {docId && (
          <div className="mb-6 text-sm text-gray-400">
            <strong>Document ID:</strong> {docId}
          </div>
        )}

        {/* Question Input */}
        <div className="flex mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the document"
            className="flex-1 border border-gray-600 bg-gray-700 text-gray-200 rounded p-2 placeholder-gray-400"
          />
          <button
            onClick={handleAskQuestion}
            className="ml-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Ask
          </button>
        </div>

        {/* Loading / Answer */}
        {loading && <p className="text-gray-400 text-center">Loading...</p>}
        {answer && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <strong className="text-blue-300">Answer:</strong>
            <p className="mt-2 text-gray-200">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
