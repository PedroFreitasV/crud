import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Crud from './crud';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            setIsAuthenticated(!!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/crud' element={<Crud />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
