import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/layout';
import ProfilePage from './Pages/ProfilePage/Profile';
import PrivacyPolicyPage from './Pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfServicePage from './Pages/TermsOfService/TermsOfService';
import { Login } from './Pages/Auth/Login';
import { Register } from './Pages/Auth/Register';
import { AuthProvider } from 'react-auth-kit';
import Dashboard from './Pages/Dashboard/layout';

function App() {
    return (
        <AuthProvider authType={'localstorage'} authName={'x-authorization'}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route
                            path="/privacyPolicy"
                            element={<PrivacyPolicyPage />}
                        ></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        ></Route>
                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        ></Route>
                        <Route
                            path="/termsOfService"
                            element={<TermsOfServicePage />}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AuthProvider>
    );
}

export default App;
