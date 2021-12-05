const express = require("express");

const router = express.Router();

const db = require("../models");


router.get("/all", (req, res)=>{
    db.todo.findAll().then(todos => res.send(todos));
});

router.post("/all", (req,res)=> {
    if(!req.body.text){
        res.status(400).send({
            message:"content can not be empty"
        });
        return;
    };

    const dataSet = {
        text : req.body.text
    }

    db.todo.create(dataSet).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "some error occurs"
        });
    });
})


router.put("/all/:id", (req, res)=> {
    const id = req.params.id;

    db.todo.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num ==1){
            res.send({message: "Dataset was updated successfully"})
        }else {
            res.send({message:"cannot update dataset"});
        }
    })
    .catch(err =>  {
        res.status(500).send({message:"error updating the dataset"})
    });
});


router.delete("/all/:id", (req,res)=> {

   db.todo.destroy({
        where: {
          id: req.params.id
        }
      })
    .then(num => {
        if(num ==1){
            res.send({message: "Dataset was deleted successfully"})
        }else {
            res.send({message:"cannot delete dataset"});
        }
    })
    .catch(err => {
        res.status(500).send({message:"error deleting the dataset"})
    })
    // db.todo.destroy({
    //     where: {
    //       id: req.params.id
    //     }
    //   }).then(() => res.send("success"));
   
});


router.get("/all/:id", (req,res)=>{
    const id = req.params.id;
     db.todo.findByPk(id).then(data => {
         if(data){
             res.send(data);
         }else {
             res.status(404).send({
                 message:"cannot find the dataset"
             });
         }
     })
     .catch(err =>{
         res.status(500).send({message:"error retrive the dataset"});
     });
});




module.exports = router;