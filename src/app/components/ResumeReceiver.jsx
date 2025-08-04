"use client";
import React, { useState } from "react";

const ResumeReceiver = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selected.type)
    ) {
      setFile(selected);
    } else {
      alert("Please upload a valid PDF or DOCX file.");
    }
  };

  const handleScoreCheck = async () => {
    if (!file) return alert("Please upload a file first.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/score-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const resultArray = Array.isArray(data) ? data : data.results || [];
      setResults(resultArray);
      setShowModal(true);
    } catch (err) {
      console.error("Error scoring resume", err);
      alert("Failed to score resume");
    } finally {
      setLoading(false);
    }
  };

  const currentFileName = file?.name;
  const currentResults =
    currentFileName && Array.isArray(results)
      ? results.filter((r) => r.Resume === currentFileName)
      : [];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gradient-to-b from-blue-900 to-black p-8 rounded-xl shadow-xl w-full max-w-xl text-center border border-[#0D00FF]">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Score Your Resume
        </h1>
        <p className="text-[#B3B3B3] mb-6">
          Upload your resume in{" "}
          <span className="text-white font-semibold">PDF</span> format. We'll
          analyze it and tell you how well it matches job requirements.
        </p>

        <label
          htmlFor="resumeUpload"
          className="block border-dashed border-2 border-gray-400 py-10 rounded-lg cursor-pointer hover:border-[#0D00FF] transition"
        >
          <div>
            <svg
              className="mx-auto mb-2 text-white"
              fill="none"
              height="40"
              viewBox="0 0 24 24"
              width="40"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16V4m0 0L8 8m4-4l4 4M4 16h16v4H4v-4Z"
              />
            </svg>
            <p className="text-sm text-gray-300">
              Click to upload or drag your resume here
            </p>
            <p className="text-xs text-gray-400 mt-1">
              (Only PDF or DOCX, max 2MB)
            </p>
          </div>
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <div className="mt-4">
            <p className="text-sm text-green-400">Selected: {file.name}</p>
            <button
              onClick={handleScoreCheck}
              disabled={loading}
              className={`mt-4 px-6 py-2 rounded-lg font-semibold transition cursor-pointer ${
                loading
                  ? "bg-gray-600 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {loading ? "Scoring..." : "Check Score"}
            </button>

            {loading && (
              <div className="mt-4 flex justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && currentResults.length > 0 && showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                <div className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-xl relative">
                  <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                  <h3 className="text-lg font-semibold mb-4">
                    Results for:{" "}
                    <span className="text-blue-600">{currentFileName}</span>
                  </h3>
                  {currentResults.map((item, index) => (
                    <div key={index} className="text-sm mb-2">
                      <strong>{item["Job Title"]}</strong>: {item["Score"]}% (
                      {item["Remark"]})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReceiver;
