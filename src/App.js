import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HamburgerMenu from "./components/HumburgerMenu/HamburgerMenu";
import Home from './components/Home/Home';
import EventList from './components/EventManagement/EventList';
// import TaskList from './components/TaskAssignment/TaskList';
import VolunteerList from './components/VolunteerTracking/VolunteerList';

function App() {
    return (

        <Router>
            <div>
                <HamburgerMenu/>
                {/*<div className="App">*/}
                    <div className="content">

                        {/*<EventList/>*/}
                        {/*<TaskList />*/}
                        {/*<VolunteerList/>*/}

                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/events" element={<EventList/>}/>
                            <Route path="/volunteers" element={<VolunteerList/>}/>
                        </Routes>
                    </div>
                </div>
            {/*</div>*/}
        </Router>

    );
}

export default App;
