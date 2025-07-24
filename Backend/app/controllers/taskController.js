import Task from "../databaseModels/taskModel.js";
export const addTask = async(req,res)  => {
    try {

        const {title,description} = req.body;
        const userId = req.userId.id;

        if(!userId){
            return res.status(400).json({message:"User id missing"});
        }
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
          }   

        const task = new Task({title , description , userId , state:false})
        await task.save();
        return res.status(201).json({message :" Task added successfully"});
    } catch (error) {
        console.log("Error in add task",error);
        return res.status(500).json({message : "Internal server error"});
    }
}

export const taskDone = async(req,res) => {
    const {id} = req.params;
    
    try {
        const task = await Task.findByIdAndUpdate(id,{state : true},{new:true});
        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(201).json({message : "Task marked as done", task});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Internal Server error"});        
    }
}


export const deleteTask = async(req,res)  => {
    
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        console.log(task);
        if(!task){
            return res.status(404).json({error: "Task not found"});
        }
        else{
            return res.status(200).json({message :"Task deleted successfully"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export const getTaskById = async(req,res) => {
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndUpdate(id,{});
        if(!task){
            return res.status(401).json({error: "Task not found"});
        }
        else{
            return res.status(200).json(task);
        }
    } catch (error) {
        console.log("Error in get task by id" ,error);
        return res.status(500).json({error:"Internal server error"});
    }
}


export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    // Basic validation
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        console.log("Error in updating task:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllTasks = async(req,res)  => {
    const userId = req.userId.id;
    try {
        const tasks = await Task.find({userId});
        return res.status(200).send(tasks);
    } catch (error) {
        console.log("Error in all tasks" ,error);
        return res.status(500).json({error: "Internal server error"});
    }
}