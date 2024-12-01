import React, {useEffect, useState} from 'react'
import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import AdminDashboard from "./components/LoginPage/AdminDashboard";
import VolunteerDashboard from "./components/LoginPage/VolunteerDashboard";
import Home from './components/Home/Home';
import EventList from './components/EventManagement/EventList';
import PageWrapper from './PageWrapper';
import Navbar from "./components/Navbar/Navbar";
import VolunteerTracking from "./components/VolunteerDashboard/VolunteerTracking";
import RegisterPage from "./components/Registration/RegisterPage";

function App() {

    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role'),
    });



    const handleLogin = (token, role) => {
        setAuth({token, role});
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

    };

    const handleLogout = () => {
        setAuth({token: null, role: null});
        localStorage.removeItem("token");
        localStorage.removeItem("role");

    };
    useEffect(() => {
        if (!auth.token) {
            // If not authenticated, redirect to the login page
            return;
        }
    }, [auth.token]);

    return (
        <Router>
            <div>
                {auth.token && <Navbar onLogout={handleLogout}/>}
                <div className="content">
                    <Routes>
                        {/* Public Route */}
                        <Route path="/" element={<PageWrapper className="home-page"><Home/></PageWrapper>}/>
                        <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                        <Route path="/register" element={<RegisterPage />} /> {/* Add this */}


                        {/* Protected Routes */}
                        {auth.role === "ADMIN" && (
                            <>
                                <Route
                                    path="/admin"
                                    element={
                                        <PageWrapper className="admin-dashboard">
                                            <AdminDashboard token={auth.token} onLogout={handleLogout}/>
                                        </PageWrapper>
                                    }
                                />
                                <Route
                                    path="/events"
                                    element={
                                        <PageWrapper className="events-page">
                                            <EventList token={auth.token}/>
                                        </PageWrapper>
                                    }
                                />
                                <Route
                                    path="/contributions"
                                    element={
                                        <PageWrapper className="volunteers-page">
                                            <VolunteerTracking token={auth.token}/>
                                        </PageWrapper>
                                    }
                                />
                            </>
                        )}

                        {auth.role === "VOLUNTEER" && (
                            <>
                                <Route
                                    path="/volunteer"
                                    element={
                                        <PageWrapper className="volunteer-dashboard">
                                            <VolunteerDashboard token={auth.token} onLogout={handleLogout}/>
                                        </PageWrapper>
                                    }
                                />
                                <Route
                                    path="/events"
                                    element={
                                        <PageWrapper className="events-page">
                                            <EventList token={auth.token}/>
                                        </PageWrapper>
                                    }
                                />
                            </>
                        )}

                        {/* Redirect Unauthenticated Users */}
                        <Route
                            path="*"
                            element={<Navigate
                                to={auth.token ? (auth.role === "ADMIN" ? "/admin" : "/volunteer") : "/login"}/>}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
