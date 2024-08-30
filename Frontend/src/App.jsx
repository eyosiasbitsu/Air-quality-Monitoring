import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import TablePage from './components/TablePage';
import SignIn from './components/SignIn';
import RegisterSensor from "./components/RegisterSensor"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<TablePage />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<RegisterSensor />} />

            </Routes>
        </Router>
    );
};

export default App;
