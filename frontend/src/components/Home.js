import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import axios from 'axios';

const Home = () => {
    const { isAuth } = useContext(Context);
    return (
        <>
            {
                isAuth
                    ? <div>
                        <SignedInHome />
                    </div>
                    : <SignedOutComponent />
            }
        </>
    )
}



const SignedInHome = () => {
    const [completeTask, setCompletedTask] = useState([]);
    const [inCompleteTask, setInCompletedTask] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateTask = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:5001/task/new', { title, description }, {
                withCredentials: true
            })
                .then(response => {
                    fetchData();
                }).catch(err => err)
        } catch (error) {
            console.log(error);
        }
        setTitle('');
        setDescription('');
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5001/getAllTask', {
                withCredentials: true
            });

            if (response.data.success) {
                setCompletedTask(response.data.allTask.filter(task => task.isCompleted));
                setInCompletedTask(response.data.allTask.filter(task => !task.isCompleted));
            }
        } catch (error) {
            console.error('Abhi data nahi aaya', error.message);
        }
    };

    const handleUpdateClick = (e, id) => {
        e.stopPropagation();
        try {
            axios.put(`http://localhost:5001/task/update/${id}`, {}, {
                withCredentials: true
            })
                .then(response => {
                    fetchData();
                })
                .catch(err => err)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteClick = (e, id) => {
        e.stopPropagation();
        try {
            axios.delete(`http://localhost:5001/task/delete/${id}`, {
                withCredentials: true
            })
                .then(response => {
                    fetchData();
                })
                .catch(err => err)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <React.Fragment>
            <div className='border container mx-auto my-10 shadow-lg rounded-3xl bg-green-200'>
                <h1 className='text-center text-xl mt-4'>Create New Task</h1>
                <form onSubmit={handleCreateTask}
                    className=''>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="title" name="title" id="title"
                        placeholder="Enter Title"
                        required
                        className='border p-2 outline-none block my-2 rounded-lg w-[50%] mx-auto mt-6' />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="description" name="description" id="description"
                        placeholder="Enter Description"
                        required
                        className='border p-2 outline-none block my-2 rounded-lg w-[50%] mx-auto mt-6' />


                    <input type="submit" value="Add Task" className='text-center block w-[50%] transition duration-300 my-6 text-xl font-semibold rounded border-2 border-blue-600 mx-auto p-2 hover:bg-blue-600 hover:text-white cursor-pointer' />
                </form>
            </div>
            <div className='container mx-auto border my-10 shadow-lg'>
                <h1 className='text-center text-xl mt-4'>Welcome User, Here is your all Task...</h1>
                <p className='w-full text-center bg-red-400 text-white p-4 font-semibold text-xl mt-4' >Incomplete Task - {inCompleteTask.length}</p>
                <div className='m-6'>
                    {
                        inCompleteTask.length ?
                            inCompleteTask.map((task, i) =>
                                <div className='bg-slate-200 flex p-4 justify-between my-4 rounded-lg' key={task._id}>
                                    <span>{i + 1}</span>
                                    <h3 className='w-[20%] font-semibold '>{task.title}</h3>
                                    <p className='w-[60%] border'>{task.description}</p>
                                    <div className='w-[10%] border flex justify-between'>
                                        <label onClick={(e) => handleUpdateClick(e, task._id)} className='text-lg font-semibold cursor-pointer  hover:text-blue-600 text-green-600' htmlFor="isCompleted">Done</label>
                                        <input className='h-5 w-5 hidden' type="checkbox" name="isCompleted" id="isCompleted" />
                                        <button onClick={(e) => handleDeleteClick(e, task._id)} className='text-lg  font-semibold text-red-600 hover:text-blue-600'>Delete</button>
                                    </div>
                                </div>
                            )
                            :
                            <div className='bg-slate-200 p-4 my-4 rounded-lg'>
                                <h3 className='text-center font-semibold '>You don't have any incomplete task</h3>
                            </div>
                    }
                </div>
                <p className='w-full text-center bg-green-600 text-white p-4 font-semibold text-xl mt-4' >Completed Task - {completeTask.length}</p>
                <div className='m-6'>
                    {
                        completeTask.map((task, i) =>
                            <div className='bg-slate-200 flex p-4 justify-between my-4 rounded-lg' key={task._id}>
                                <span>{i + 1}</span>
                                <h3 className='w-[20%] font-semibold '>{task.title}</h3>
                                <p className='w-[60%] border'>{task.description}</p>
                                <div className='w-[10%] border flex justify-between'>
                                    <label onClick={(e) => handleUpdateClick(e, task._id)} className='text-lg font-semibold cursor-pointer hover:text-blue-600 text-green-600' htmlFor="isCompleted">Undo</label>
                                    <input className='h-5 w-5 hidden' type="checkbox" name="isCompleted" id="isCompleted" />
                                    <button onClick={(e) => handleDeleteClick(e, task._id)} className=' text-lg font-semibold text-red-600 hover:text-blue-600'>Delete</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export const SignedOutComponent = () => {
    return (
        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <h4 className='text-5xl mb-10'>Opps! You are Logged Out</h4>
            <h5 className='text-3xl text-center'>Please Login to manage your task</h5>
        </div>
    )
}

export default Home
