import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard(){
    const { user } = useAuth();

    return(
        <div className="page-container">
            <div className="dashboard-card">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.name || "User"}! You are logged into the Online Judge dashboard.</p>
                <Link to="/problems" className="btn-action">
                    Browse Coding Challenges
                </Link>
            </div>
        </div>
    )
};