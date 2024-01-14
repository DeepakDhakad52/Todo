import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../..';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const { setIsAuth } = useContext(Context)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5001/login', { email, password }, {
                withCredentials: true
            })
                .then(response => {
                    if (response.data.success) {
                        setIsAuth(true);
                        // setToken(response.data.token)
                        navigate('/')
                    }
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log("My error", error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit}
            className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl bg-[#a2b9ff] w-[30%] h-[50%] rounded-lg'>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" name="email" id="email"
                placeholder="Enter Email"
                required
                className='border p-2 outline-none block my-2 rounded-lg w-[80%] mx-auto mt-32' />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" name="password" id="password"
                placeholder="Enter Password"
                required
                className='border p-2 outline-none block my-2 rounded-lg w-[80%] mx-auto mt-6' />

            <p className='text-lg text-center my-6'><span>Don't have an account?</span> <Link to={'/register'} className='underline font-semibold text-red-500'>click here to register</Link></p>

            <input type="submit" value="Login" className='text-center block w-[80%] my-6 text-xl font-semibold rounded border-2 border-blue-600 mx-auto p-2 hover:bg-blue-600 cursor-pointer' />
        </form>
    )
}

export default Login
