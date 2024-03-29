import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginForm.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirecionar para o CRUD após o login bem-sucedido
            window.location.href = '/crud'; // Substitua '/crud' pela rota do seu CRUD
        } catch (error) {
            alert('Falha ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
}

export default LoginForm;