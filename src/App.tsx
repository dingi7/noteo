import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import { ToastContainer } from 'react-toastify';

// Page Imports
import HomePage from './Pages/HomePage/layout';
import PrivacyPolicyPage from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfServicePage from './Pages/TermsOfService/TermsOfService';
import Dashboard from './Pages/Dashboard/layout';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

// Styles
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider authType="localstorage" authName="x-authorization">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/privacyPolicy"
                            element={<PrivacyPolicyPage />}
                        />
                        <Route
                            path="/termsOfService"
                            element={<TermsOfServicePage />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
