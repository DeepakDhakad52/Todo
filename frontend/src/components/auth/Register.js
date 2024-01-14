import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../..';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setIsAuth } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5001/register', { name, email, password }, {
                withCredentials: true
            })
                .then(response => {
                    if (response.data.success) {
                        setIsAuth(true);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="name" name="name" id="name"
                placeholder="Enter Name"
                className='border p-2 outline-none block my-2 rounded-lg w-[80%] mx-auto mt-24' />

            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" name="email" id="email"
                placeholder="Enter Email"
                className='border p-2 outline-none block my-2 rounded-lg w-[80%] mx-auto mt-6' />

            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" name="password" id="password"
                placeholder="Enter Password"
                className='border p-2 outline-none block my-2 rounded-lg w-[80%] mx-auto mt-6' />

            <p className='text-lg text-center my-6'><span>Already have an account?</span> <Link to={'/login'} className='underline font-semibold text-red-500'>click here to login</Link></p>

            <input type="submit" value="Register" className='text-center block w-[80%] my-6 text-xl font-semibold rounded border-2 border-blue-600 mx-auto p-2 hover:bg-blue-600 cursor-pointer' />
        </form>

    )
}

export default Register
