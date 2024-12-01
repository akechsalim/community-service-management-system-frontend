import React, {useState} from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ADMIN');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
                role
            });
            // Check if the response was successful and handle it
            if (response.status === 201) {
                const loginResponse = await axios.post("http://localhost:8080/api/auth/login", {
                    username,
                    password,
                });

                const {token, role} = loginResponse.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                alert("User registered and logged in successfully!");
                window.location.href = role === "ADMIN" ? "/admin" : "/volunteer";
            } else {
                setError("Registration failed.");
            }
        } catch (err) {
            setError("Error registering user");
        }

    }
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="ADMIN">Admin</option>
                    <option value="VOLUNTEER">Volunteer</option>
                </select>
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default RegisterPage;
