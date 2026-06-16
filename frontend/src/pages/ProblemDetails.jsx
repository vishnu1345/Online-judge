import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function ProblemDetails() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [testcase, setTestcase] = useState(null);

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
    </div>
  );
}
