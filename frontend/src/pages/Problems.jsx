import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Problems(){
    const [problems , setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProblems = async ()=>{
            try {
                const res = await api.get('/problems');
                console.log(res);
                setProblems(res.data.problems);
            } catch (error) {
                console.log(error);
            } 
        };

        fetchProblems();
    } , []);
    return (
        <div className="page-container">
            <div className="problems-header">
                <h1>Coding Challenges</h1>
                <p>Browse through the problems and test your coding skills</p>
            </div>

            <div className="problems-list">
                {problems.map((problem) => (
                    <div 
                        key={problem._id}
                        className="problem-card"
                        onClick={() => navigate(`/problems/${problem._id}`)}
                    >
                        <div className="problem-info">
                            <h3>{problem.title}</h3>
                            <p>Challenge your logical thinking</p>
                        </div>
                        <span className={`difficulty-badge ${problem.difficulty?.toLowerCase() || 'easy'}`}>
                            {problem.difficulty || 'Easy'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}