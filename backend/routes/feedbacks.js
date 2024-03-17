const router =require("express").Router();
let feedback=require("../models/feedback");


http://localhost:8050/feedback
router.route("/add").post((req,res) =>{
   
    const name=req.body.name;
    const email=req.body.email;
    const message=req.body.message;

    const newfeedback=new feedback({
        name,
        email,
        message
    })

    newfeedback.save().then(()=>{
         res.json("feedback Added")
    }).catch((err)=>{
        console.log(err);
    })

})

http://localhost:8050/feedback/

router.route("/").get((req,res)=>{
    feedback.find().then((feedbacks)=>{
        res.json(feedbacks)

    }).catch((err)=>{
        console.log(err)
    })
})

http://localhost:8050/feedback/update

router.route("/update/:id").put(async(req,res)=>{
    let userId=req.params.id;
    const {name,email,message}=req.body;

    const updatefeedback={
        name,
        email,
        message
    }

    const update=await feedback.findByIdAndUpdate(userId,updatefeedback)
    .then(()=>{
        res.status(200).send({status:"User updated"})
    }).catch((err) =>{
      console.log(err);
      res.status(500).send({status:"Error with updating data",error:err.message});

    })

    
})

http://localhost:8050/feedback/delete
router.route("/delete/:id").delete(async(req,res)=>{
  let userId=req.params.id;

  await feedback.findByIdAndDelete(userId)
  .then(()=>{
     res.status(200).send({status:"User deleted"});
  }).catch((err)=>{
    res.status(500).send({status:"Error with delete user",error:err.message});
  })
})
router.route("/get/:id").get(async(req,res)=>{
   let userId =req.params.id;
   const user=await feedback.findById(userId)
   .then((feedbacks)=>{
      res.status(200).send({status:"User fetched",feedbacks})
   }).catch(()=>{
      console.log(err.message);
      res.status(500).send({status:"Error with get user",error:err.message});
   })
})






module.exports=router;

