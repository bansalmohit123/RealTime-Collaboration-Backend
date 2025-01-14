const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET;

const createTask = async (req, res) => {
  const { title, description, description1, status, date, membersName, teamId , type} = req.body;
  console.log(req.body);
  try {
    // const existingTask = await prisma.task.findUnique({
    //   where: { title: req.body.title, description: req.body.description },
    // });
    // if (existingTask) {
    //   return res.status(400).json({ message: "Task already exists" });
    // }
    // let parsedMembersName;
    // if (typeof membersName === 'string') {
    //   try {
    //     parsedMembersName = JSON.parse(membersName);
    //   } catch (error) {
    //     return res.status(400).json({ message: "Invalid membersName format" });
    //   }
    // } else {
    //   parsedMembersName = membersName;
    // }

    const newTask = await prisma.task.create({
      data: {
        title: title ,
        description1: description1 ,
        description: description,
        status: status,
        type: type,
        membersName: membersName,
        teamId: teamId ,
        date: date ,
      },
    });

    const updatedTasks = await prisma.task.findMany();
    res.status(200).json({
      isSuccess: true,
      message: "Task created successfully",
      task: newTask,
      id : newTask.id,
      title : newTask.title,
      description1 : newTask.description1,
      description : newTask.description,
      status : newTask.status,
      type : newTask.type,
      membersName : newTask.membersName,
      teamId : newTask.teamId,
      date : newTask.date,
      
      // tasks: updatedTasks,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: "Error creating task",
      error,
    });
  }
};


const getTask = async (req, res) => {
  
  const { teamId } = req.body;
  if (!teamId) {
    return res.status(400).json({ message: "Team Id is required" });
  }
  const tasks = await prisma.task.findMany({
    where: {
      teamId: teamId,
    },
  });

  if (tasks.length === 0) {
    return res.status(404).json({ message: "No tasks found for the given team Id" });
  }
  res.status(200).json({
    isSuccess: true,
    message: "Task created successfully",
    tasks: tasks,
});

};

module.exports = { createTask , getTask };
