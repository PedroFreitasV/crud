import React from 'react'
import { db } from './firebase'
import './crud.css'
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, deleteUser, updateEmail, updatePassword } from 'firebase/auth';

function Crud() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [bio, setBio] = useState()
    const [password, setPassword] = useState()
    const [fetchData, setFetchData] = useState([])
    const [id, setId] = useState()

    //Criando Database
    const dbref = collection(db, "crud")

    // Firebase Authentication
    const auth = getAuth();

    //Iniciando data
    const add = async () => {
        try {
            // Adiciona o usuário ao Firestore
            const adddata = await addDoc(dbref, { Name: name, Email: email, Bio: bio, Password: password })
            if (adddata) {
                // Adiciona o usuário ao Firebase Authentication
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Usuario adicionado com sucesso')
                window.location.reload()
            } else {
                alert('Algum erro ocorreu')
            }
        } catch (error) {
            alert('Algum erro ocorreu')
        }
    }

    //Fetching
    const fetch = async () => {
        const snapshot = await getDocs(dbref)
        const fetchdata = snapshot.docs.map((doc => ({ id: doc.id, ...doc.data() })))
        setFetchData(fetchdata)
    }

    useEffect(() => {
        fetch()
    }, [])

    //Pass
    const passData = async (id) => {
        const matchId = fetchData.find((data) => {
            return data.id === id
        })
        setName(matchId.Name)
        setEmail(matchId.Email)
        setBio(matchId.Bio)
        setPassword(matchId.Password)
        setId(matchId.id)
    }

    //update
    const update = async () => {
        const updateref = doc(dbref, id)
        try {
            const updatedata = await updateDoc(updateref, { Name: name, Email: email, Bio: bio, Password: password })

            // Verifica se há um usuário autenticado
            const user = auth.currentUser;
            if (user && user.email) {
                // Atualiza no Firebase Authentication
                await updateEmail(user, email);
                await updatePassword(user, password);
            } else {
                throw new Error('Nenhum usuário autenticado');
            }

            alert("Edição bem sucedida")
            window.location.reload()
        } catch (error) {
            alert("Erro na edição: " + error)
        }
    }

    //Delete
    const del = async (id) => {
        const delref = doc(dbref, id)
        try {
            await deleteDoc(delref)

            // Verifica se há um usuário autenticado
            const user = auth.currentUser;
            if (user) {
                // Exclui usuário do Firebase Authentication
                await deleteUser(user);
            } else {
                throw new Error('Nenhum usuário autenticado');
            }

            alert("Usuario Excluido")
            window.location.reload()
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className='form_container'>
                <h2>Adicionar / Editar Form</h2>
                <div className='box'>
                    <input type='text' placeholder='Nome completo' autoComplete='Off' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='box'>
                    <input type='email' placeholder='E-mail' autoComplete='Off' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='box'>
                    <input type='text' placeholder='Bio' autoComplete='Off' value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <div className='box'>
                    <input type='password' placeholder='Senha' autoComplete='Off' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={add}>Adicionar</button>
                <button onClick={update}>Editar</button>
                <Link to="/" className="btn-logout">Sair</Link>
            </div>
            <div className='database'>
                <h2>CRUD Database</h2>
                <div className='container'>
                    {
                        fetchData.map((data) => {
                            return (
                                <>
                                    <div className='box'>
                                        <h3>Nome: {data.Name}</h3>
                                        <h3>E-mail: {data.Email}</h3>
                                        <h3>Bio: {data.Bio}</h3>
                                        <h3>Senha: {data.Password}</h3>
                                        <button onClick={() => passData(data.id)}>Editar</button>
                                        <button className='delete' onClick={() => del(data.id)}>Excluir</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Crud