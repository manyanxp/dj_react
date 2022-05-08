import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Dashboard from './components/pages/Dashboard';
import Graph from './components/pages/Graph';

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} exact/> 
                <Route path="/graph" element={<Graph />} />
            </Routes>
        </Router>
    );
}

export default App;
