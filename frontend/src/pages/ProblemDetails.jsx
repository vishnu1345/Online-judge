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
  const [code , setCode] = useState(defaultCpp);
  const [verdict , setVerdict] = useState(null);
  const [loading , setLoading] = useState(false);

  const handleSubmit = async ()=>{
    setLoading(true);
    try {
        const res = await api.post(`/submit/${id}` , {
            code , 
            language : "cpp"
        })
        console.log(res);
        setVerdict(res.data.verdict);

    } catch (error) {
        console.log(error);
    } finally{
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

          <Editor 
            height="500px"
            defaultLanguage="cpp"
            value={code}
            onChange={(value)=>setCode(value)}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {
                loading ? "Judging..." : "Submit"
            }
          </button>
          {
            verdict && (
                <div>
                    Verdict : {verdict}
                </div>
            )
          }
    </div>
  );
}
