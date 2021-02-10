const express = require('express');
const router = new express.Router();
const Student = require('../models/students');

router.post("/students", async(req,res)=>{
   

    try {
         const user = new Student(req.body);
          const createUser = await user.save();
         res.status(201).send(createUser);

    } catch (e) { res.status(400).send(e); }
})



// get request read the data from the server 
router.get("/students", async(req,res)=>{
   

    try {
        const studentData = await Student.find();
        res.send(studentData);

    } catch (e) { 
        res.send(e);
     }
})

//get the indivisual student data
router.get("/students/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const studentDta = await Student.findById(_id);
        res.send(studentDta);
    } catch (e) {
        res.send(e);
    }
})

//update the student data by id
router.patch("/students/:id", async(req,res)=>{
    try {
           const _id = req.params.id;
           const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
               new: true
           }); 
           res.send(updateStudent);
    } catch (e) {
            res.status(404).send(e);
    }
})


//delete request
router.delete("/students/:id" , async(req,res)=>{
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);
    }
})




module.exports = router;