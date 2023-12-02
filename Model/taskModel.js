const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['inProgress', 'completed'], 
    },
    deadline: {
      type: Date,
      required: true,
    },
    taskId:{
      type: String,
    },
    detail: {
      type: String,
      required: true,
    },
    recurrencePattern: {
      type: String,
      enum: ['daily', 'weekly', 'monthly']
    },
    recurrenceInterval: {
      type: Number,
    },
  });
  

const Task = mongoose.model("Task", taskSchema , "Tasks", { database: "Task-Manager" });

module.exports = Task;