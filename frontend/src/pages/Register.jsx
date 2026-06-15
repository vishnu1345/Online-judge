import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
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
            const res = await api.post('/auth/register', formData);
            await fetchUser();
            navigate('/dashboard');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div>
                <h1>Registration Form</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <input type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}