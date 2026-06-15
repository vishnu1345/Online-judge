import React, { useState } from "react";
import api from "../services/api";
import Dashboad from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { fetchUser } = useAuth();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
            // console.log("start");
            const res = await api.post('/auth/login', formData);

            console.log(res);

            // console.log("end");

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