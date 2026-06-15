import React, { useEffect, useState } from "react";
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
    return(
        <>
            <h1>Problems</h1>

            {problems.map((problem)=>(
                <div key={problem._id}
                    onClick={()=> navigate(`/problems/${problem._id}`)}
                >
                    <h2>{problem.title}</h2>
                    <p>{problem.difficulty}</p>
                </div>
            ))}
        </>
    )
}