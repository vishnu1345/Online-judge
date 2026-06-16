import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Editor from "@monaco-editor/react";

export default function ProblemDetails() {
  const defaultCpp = `#include <iostream>
using namespace std;

int main() {

return 0;
}`;

  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [testcase, setTestcase] = useState(null);
  const [code, setCode] = useState(defaultCpp);
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorDetail, setErrorDetail] = useState(null);
  const [expectedOutput, setExpectedOutput] = useState(null);
  const [receivedOutput, setReceivedOutput] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setVerdict(null);
    setErrorDetail(null);
    setExpectedOutput(null);
    setReceivedOutput(null);
    try {
      const res = await api.post(`/submit/${id}`, {
        code,
        language: "cpp"
      })
      console.log(res);
      setVerdict(res.data.verdict);
      if (res.data.error) {
        setErrorDetail(res.data.error);
      }
      if (res.data.expected !== undefined) {
        setExpectedOutput(res.data.expected);
      }
      if (res.data.received !== undefined) {
        setReceivedOutput(res.data.received);
      }

    } catch (error) {
      console.log(error);
      setVerdict("API_ERROR");
      setErrorDetail(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await api.get(`/problems/${id}`);

        setProblem(res.data.problem);
        setTestcase(res.data.testcase);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblem();
  }, [id]);

  if (!problem) {
    return (
      <div className="page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/problems" className="back-link">
        &larr; Back to Problems
      </Link>

      <div className="problem-details-layout">
        {/* Left Column: Problem description and test cases */}
        <div className="problem-details-card">
          <div className="detail-header">
            <div className="detail-header-left">
              <h1>{problem.title}</h1>
            </div>
            <span className={`difficulty-badge ${problem.difficulty?.toLowerCase() || 'easy'}`}>
              {problem.difficulty || 'Easy'}
            </span>
          </div>

          <h2 className="detail-section-title">Statement</h2>
          <div className="statement-text">{problem.statement}</div>

          <h2 className="detail-section-title">Test Cases</h2>
          <div className="testcases-container">
            {testcase?.cases?.map((tc, index) => (
              <div key={index} className="testcase-card">
                <h4>Example {index + 1}</h4>

                <div className="testcase-io-group">
                  <div className="io-box">
                    <span className="io-label">Input:</span>
                    <pre className="code-block">{tc.input}</pre>
                  </div>

                  <div className="io-box">
                    <span className="io-label">Output:</span>
                    <pre className="code-block">{tc.output}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Code editor and submission action */}
        <div className="editor-card">
          <div className="editor-header">
            <h3>Write Your Solution</h3>
            <span className="language-badge">C++ (GCC)</span>
          </div>

          <div className="editor-wrapper">
            <Editor
              height="450px"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 12, bottom: 12 }
              }}
            />
          </div>

          <div className="editor-actions">
            <button
              className="btn-submit"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Judging..." : "Submit Code"}
            </button>

            {verdict && (
              <div className={`verdict-box ${verdict.toLowerCase().replace('_', '-').replace(' ', '-')}`}>
                Verdict: {verdict}
              </div>
            )}
          </div>

          {verdict && (
            <div className="result-section">
              {errorDetail && (
                <div className="result-details">
                  <span className="io-label">Error Details:</span>
                  <pre className="code-block error-output">{errorDetail}</pre>
                </div>
              )}

              {(expectedOutput !== null || receivedOutput !== null) && (
                <div className="testcase-io-group" style={{ marginTop: '8px' }}>
                  <div className="io-box">
                    <span className="io-label">Expected Output:</span>
                    <pre className="code-block">{expectedOutput}</pre>
                  </div>
                  <div className="io-box">
                    <span className="io-label">Your Output:</span>
                    <pre className="code-block wrong-output">{receivedOutput}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
