import axios from "axios";
import React, {useContext, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
function LoginPage () {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext);
    async function loginUser (e) {
        e.preventDefault()
        try {
            const user = await axios.post('/login', {
                email,
                password
            })
            setUser(user.data);
            alert("Logged in successfully")
            setRedirect(true)
        } catch (e) {
            alert('Login failed')
        }
    }

    if(redirect)
        return <Navigate to={'/'} />
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={loginUser}>
                    <input 
                        type="email" 
                        placeholder="yourmail@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="loginBtn">Login</button>

                    <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage