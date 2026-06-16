import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { fetchUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await api.post('/auth/register', formData);
            await fetchUser();
            navigate('/dashboard');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Register to start solving coding problems</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input 
                            id="name"
                            type="text"
                            name="name"
                            className="form-input"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input 
                            id="email"
                            type="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                            id="password"
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn-submit" type="submit">Register</button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/">Sign In</Link>
                </div>
            </div>
        </div>
    )
}