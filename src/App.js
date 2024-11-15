import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import EventList from './components/EventManagement/EventList';
import PageWrapper from './PageWrapper';
import VolunteerList from './components/VolunteerTracking/VolunteerList';
import Navbar from "./components/Navbar/Navbar";
import TaskForm from "./components/TaskAssignment/TaskForm";
import TaskList from "./components/TaskAssignment/TaskList";

function App() {

    return (
        <Router>
            <div>
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<PageWrapper className="home-page"><Home/></PageWrapper>}/>
                        <Route path="/events" element={<PageWrapper className="events-page"><EventList/></PageWrapper>}/>
                        <Route path="/volunteers" element={<PageWrapper className="volunteers-page"><VolunteerList /></PageWrapper>}/>
                        <Route path="/tasks/create" element={<TaskForm/>}/>
                        <Route path="/tasks" element={<><TaskForm/><TaskList/></>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
