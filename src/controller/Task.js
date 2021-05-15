const TaskModel = require("../model/Task");
const { 
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear
} = require("date-fns");

const currentDate = new Date();

class TaskController {
    
    async create(req, res) {
        try {
            const task = await TaskModel.create(req.body);

            return res
                .status(200)
                .json(task);
                
        } catch (error) {
            return res
                .status(500)
                .json({ error: "An unexpected error occurred while creating a task" });
        }
    }

    async update(req, res) {
        try {
            const task = await TaskModel.findByIdAndUpdate(
                { "_id": req.params.id },
                req.body,
                { new: true }
            );

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json({ error: "An unexpected error occurred while updating the task" });
        }
    }

    async all(req, res) {
        try {
            const { macaddress } = req.params;

            const tasks = await TaskModel
                .find({ macaddress: { "$in" : macaddress }})
                .sort("when");
            
            return res
                .status(200)
                .json(tasks);

        } catch (error) {
            return res
                .status(500)
                .json({ error: "No tasks found at this macaddress" });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            
            const task = await TaskModel.findById(id);

            if(!!task) {
                return res
                    .status(200) 
                    .json(task);
            } else {
                return res
                .status(204)
                .json({ error: "Task not found with this id" });
            }
        
        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const task = await TaskModel.deleteOne({ "_id":  id});

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async done(req, res) {
        try {
            const { id, done } = req.params;

            const task = await TaskModel.findByIdAndUpdate(
                { "_id": id },
                { "done": done },
                { new: true }
            );

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async late(req, res) {
        try {
            const { macaddress } = req.params;

            const task = await TaskModel
                .find({
                    "when": { "$lt" : currentDate },  // Less than
                    "macaddress": { "$in" :  macaddress }
                })
                .sort("when");

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async today(req, res) {
        try {
            const { macaddress } = req.params;

            const task = await TaskModel
                .find({
                    "macaddress": { "$in" :  macaddress },
                    "when": { 
                        "$gte" : startOfDay(currentDate), // Greater than equal
                        "$lt": endOfDay(currentDate) // Less than
                    }
                })
                .sort("when");

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async week(req, res) {
        try {
            const { macaddress } = req.params;

            const task = await TaskModel
                .find({
                    "macaddress": { "$in" :  macaddress },
                    "when": {
                        "$gte" : startOfWeek(currentDate),
                        "$lt": endOfWeek(currentDate)
                    }
                })
                .sort("when");

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async month(req, res) {
        try {
            const { macaddress } = req.params;

            const task = await TaskModel
                .find({
                    "macaddress": { "$in" :  macaddress },
                    "when": {
                        "$gte" : startOfMonth(currentDate),
                        "$lt": endOfMonth(currentDate)
                    }
                })
                .sort("when");

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }

    async year(req, res) {
        try {
            const { macaddress } = req.params;

            const task = await TaskModel
                .find({
                    "macaddress": { "$in" :  macaddress },
                    "when": {
                        "$gte" : startOfYear(currentDate),
                        "$lt": endOfYear(currentDate)
                    }
                })
                .sort("when");

            return res
                .status(200)
                .json(task);

        } catch (error) {
            return res
                .status(500)
                .json(error);
        }
    }
}

module.exports = new TaskController();