const TaskModel = require("../model/Task");
const { isPast } = require("date-fns");

const TaskValidation = async (req, res, next) => {
    const { macaddress, type, title, description, when, done } = req.body;

    const error = (element) => {
        return {
            error: `${element.toUpperCase()} is not defined`
        }
    };

    if(!macaddress) 
        return res.status(400).json(error("macaddress"));
    
    if(!( type >= 0 && type < 10 ))
        return res.status(400).json(error("type"));

    if(!title)
        return res.status(400).json(error("title"));
    
    if(!description)
        return res.status(400).json(error("description"));

    if(!when)
    return res.status(400).json(error("when"));
    
    const { id } = req.params;
    
    let exist;
    
    if(id) {
        exist = await TaskModel.findOne({
            "_id": { "$ne" : id }, // Not equal
            "when": { "$eq" : new Date(when) }, // Equal
            "macaddress": { "$in" : macaddress }, // Include
        });
    } else {
        if(isPast(new Date(when))) {
            return res
                .status(400)
                .json({ error: "You can't choose a date earlier than today" });
        }
        
        exist = await TaskModel.findOne({
            "when": { "$eq" : new Date(when) },
            "macaddress": { "$in" : macaddress },
        });
    }

    if(exist) {
        return res
            .status(400)
            .json({ error: "A task already exists at this date and time" });
    }

    next();
};

module.exports = TaskValidation;