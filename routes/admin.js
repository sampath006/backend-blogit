const router = require("express").Router();
const Admin = require("../models/Admin");
const Event = require("../models/Event");
const bcrypt = require("bcrypt");


//UPDATE Admin Accout
router.put("/:id",async (req,res)=>{
    if(req.body.adminId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
        try{
            const updateAdmin = await  Admin.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new:true});
            res.status(200).json(updateAdmin);
        } catch(err){
            res.status(500).json(err);
        }
    }
    else{
        res.status(401).json("You can update only your accout!");
    }
    
});


//GET Admin Accout

router.get("/:id", async (req,res)=>{
    try{
        const admin = await Admin.findById(req.params.id);
        const {password, ...others} = admin._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err)
    }
});



module.exports = router