import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [docId, setDocId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = "https://knowledgescout-4w9r.onrender.com/api";

  // Upload file
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${backendURL}/upload`, formData);
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
      const res = await axios.post(`${backendURL}/question`, { docId, question });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      alert("Failed to get answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-400">
          KnowledgeScout
        </h1>

        {/* File Upload */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-6 gap-3">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-600 bg-gray-700 text-gray-200 rounded p-2 text-sm"
          />
          <button
            onClick={handleUpload}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>

        {/* Document ID */}
        {docId && (
          <div className="mb-6 text-xs sm:text-sm text-gray-400 break-all">
            <strong>Document ID:</strong> {docId}
          </div>
        )}

        {/* Question Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mb-6 gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the document"
            className="w-full border border-gray-600 bg-gray-700 text-gray-200 rounded p-2 text-sm placeholder-gray-400"
          />
          <button
            onClick={handleAskQuestion}
            className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Ask
          </button>
        </div>

        {/* Loading / Answer */}
        {loading && <p className="text-gray-400 text-center">Loading...</p>}
        {answer && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <strong className="text-blue-300">Answer:</strong>
            <p className="mt-2 text-gray-200 text-sm sm:text-base">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
