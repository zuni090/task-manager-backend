const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const Task = require("../Model/taskModel");

dotenv.config();

const createTask = asyncHandler(async(req,res) =>{
    const { taskId , name, type, deadline, detail, recurrencePattern, recurrenceInterval } = req.body;

  const newTask = new Task({
    taskId,
    name,
    type,
    deadline,
    detail,
    recurrencePattern,
    recurrenceInterval,
  });

  const savedTask = await newTask.save();

  res.status(201).json(savedTask);
});

const allTasks = asyncHandler(async(req,res) =>{
    try {
        const tasks = await Task.find();
        res.json(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

const deleteTask = asyncHandler(async(req,res) =>{
    const { taskId } = req.body; // Extract taskId from the request body
    console.log(taskId)

  try {
    // Find the task by ID and remove it from the database
    const deletedTask = await Task.findOneAndDelete(taskId);

    // Check if the task was found and deleted
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Respond with a success message and the deleted task
    res.json({ message: 'Task deleted successfully', deletedTask });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const updateStatus = asyncHandler(async (req, res) => {
    const { taskId } = req.body; // Extract taskId from the request body

  try {
    const taskToUpdate = await Task.findOneAndUpdate(
      { taskId: taskId }, // Assuming _id is the identifier for tasks in your database
      { $set: { type: 'completed' } },
      { new: true }
    );

    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task marked as completed', task: taskToUpdate });
  } catch (error) {
    console.error('Error marking task as completed:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
const updateTaskContent = asyncHandler(async(req,res) =>{

});


module.exports = {createTask , allTasks , deleteTask , updateTaskContent , updateStatus};
