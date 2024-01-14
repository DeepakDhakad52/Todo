import Task from "../models/taskModel.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";
import ErrorHandler from "../middleware/error.js";
import mongoose from "mongoose";

export const createNewTask = async (req, res) => {
    const { _id } = jwt.verify(req.cookies.token, process.env.JWT_SECRETKEY);
    try {
        const user = await User.findById(_id);

        if (!req.body.title || !req.body.description) {
            next(new ErrorHandler('Please provide all details...', 400));
        } else {
            const task = await Task.create({ title: req.body.title, description: req.body.description, user })
            res.status(201).json({
                success: true,
                message: 'Task Created Successfully...',
                taskId: task._id
            })
        }
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            next(new ErrorHandler('Task Not Found...', 400))
        } else {
            task.isCompleted = !task.isCompleted;
            await task.save();
            res.status(200).json({
                success: true,
                message: 'Task Updated Successfully...'
            })
        }
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) {
            next(new ErrorHandler("Task not Found", 404))
        } else {
            const response = await task.deleteOne();
            res.status(200).json({
                success: true,
                message: 'Task deleted successfully...',
                response
            })
        }
    } catch (error) {
        next(error)
    }
}

export const getAllTask = async (req, res, next) => {
    try {
        let allTask = await Task.find();
        let { _id } = jwt.verify(req.cookies.token, process.env.JWT_SECRETKEY);
        allTask = allTask.filter((task) => String(task.user) === _id)
        if (!allTask) {
            next(new ErrorHandler('Internal Server Error', 500))
        } else {
            res.status(200).json({
                success: true,
                message: 'All Task found',
                allTask
            })
        }
    } catch (error) {
        next(error)
    }
}

// 659f81aaae53cdd2a195b50b
// 659f81c9ae53cdd2a195b50e