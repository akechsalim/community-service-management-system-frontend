import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EventList from './components/EventManagement/EventList';
// import TaskList from './components/TaskAssignment/TaskList';
import VolunteerList from './components/VolunteerTracking/VolunteerList';

function App() {
    return (
        <Router>
            <div className="App">
                {/*<EventList/>*/}
                {/*<TaskList />*/}
                {/*<VolunteerList />*/}
            </div>
            <Routes>
                <Route path="/" element={<EventList />} />
                {/* Other Routes */}
                <Route path="/volunteers" element={<VolunteerList/>}/>
            </Routes>
        </Router>
    );
}

export default App;
