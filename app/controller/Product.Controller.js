const people = require('../models/peopleModel');

module.exports = {

    addPeople : async (req,res) => {
        const {survived,name,sex,age,siblingsOrSpousesAboard,parentsOrChildrenAboard,fare} = req.body ;
        try{
            const newData = new people({survived,name,sex,age,siblingsOrSpousesAboard,parentsOrChildrenAboard,fare});
            await newData.save();
            return res.json(await people.find())
        }
        catch(err){
            console.error(err.message);
            return res.status(400).json({message: err.message});
        }
    },

    getAllPeople : async (req,res) => {
        try {
            const allData = await people.find();
            return res.json(allData);
        }
        catch(err){
            console.log(err.message);
        }
    },

    getPeopleById : async (req,res) => {
        try{
            const Data = await people.findById(req.params.id)
            return res.json(Data);
        }
        catch(err){
            console.log(err.message);
            return res.status(400).json({message: "Not found"});
        }
    },

    deletePersonById : async (req,res)=>{
        try{
            await people.findByIdAndDelete(req.params.id);
            return res.json(await people.find())
        }
        catch(err){
            console.log(err.message);
            return res.status(400).json({message: "Not found"});
        }
    },

    updatePersonById : async (req,res)=>{
        try {
            const {survived,name,sex,age,siblingsOrSpousesAboard,parentsOrChildrenAboard,fare} = req.body ;
            const result = await people.findByIdAndUpdate(req.params.id,{survived,name,sex,age,siblingsOrSpousesAboard,parentsOrChildrenAboard,fare});
            res.send(result);
          } catch (error) {
            console.log(error.message);
            return res.status(400).json({message: "ID Not found"});
          }
    },

    restAllInvalidPaths : (req, res) => {
        const notFoundResponse = {
            errCode : 404,
            errMessage : 'path not found'
        }
        res.status(404).json(notFoundResponse);
    },

}