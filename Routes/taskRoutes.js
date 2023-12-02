const express = require("express");

const {createTask , allTasks , deleteTask , updateTaskContent , updateStatus} = require('../Controller/taskController');

const router = express.Router();

router.route("/").post(createTask)
router.route('/getAll').get(allTasks);
router.delete('/delete', deleteTask);
router.put('/updateStatus',updateStatus);
router.put("/updateTaskContent", updateTaskContent);


module.exports = router;