import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import EventList from './components/EventManagement/EventList';
import PageWrapper from './PageWrapper';
import Navbar from "./components/Navbar/Navbar";
import VolunteerTracking from "./components/VolunteerDashboard/VolunteerTracking";

function App() {

    return (
        <Router>
            <div>
                <Navbar/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<PageWrapper className="home-page"><Home/></PageWrapper>}/>
                        <Route path="/events" element={<PageWrapper className="events-page"><EventList/></PageWrapper>}/>
                        <Route path="/contributions" element={<PageWrapper className="volunteers-page"><VolunteerTracking/></PageWrapper>}/>

                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
