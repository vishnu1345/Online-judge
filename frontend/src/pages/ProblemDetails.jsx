import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (!problem) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{problem.title}</h1>

      <h3>Difficulty: {problem.difficulty}</h3>

      <h2>Statement</h2>
      <pre>{problem.statement}</pre>

      <h2>Test Cases</h2>

      {testcase?.cases?.map((tc, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            marginBottom: "15px",
            padding: "10px",
          }}
        >
          <h4>Example {index + 1}</h4>

          <strong>Input:</strong>
          <pre>{tc.input}</pre>

          <strong>Output:</strong>
          <pre>{tc.output}</pre>
        </div>
      ))}
    </div>
  );
}
