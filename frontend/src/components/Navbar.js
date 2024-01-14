import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '..';
import axios from 'axios';

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(Context);
    const handleLogout = () => {
        try {
            axios.get('http://localhost:5001/logout', {
                withCredentials: true
            })
                .then(res => {
                    if (res.data.success) {
                        setIsAuth(false);
                    }
                })
                .catch(err => console.log(err))
        } catch (error) {

        }
    }
    return (
        <header className='shadow'>
            <nav className='container mx-auto flex p-4 justify-between'>
                <h1 className='text-2xl font-bold'>TODO</h1>
                <ul className='flex w-1/4 justify-around text-xl '>
                    <Link to={'/'}><li className='hover:text-orange-400 font-semibold'>Home</li></Link>
                    <Link to={'/profile'}><li className='hover:text-orange-400 font-semibold'>Profile</li></Link>
                    {
                        isAuth ? <Link onClick={handleLogout}><li className='hover:text-orange-400 font-semibold'>Logout</li></Link>
                            : <Link to={'/login'}><li className='hover:text-orange-400 font-semibold'>Login</li></Link>
                    }

                </ul>
            </nav>
        </header>
    )
}

export default Navbar
