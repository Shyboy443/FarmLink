const express = require('express');
const router = express.Router();
const Payment = require("../Models/payment");

//Insert Payment
router.route("/add").post((req, res) => {

    const holdername =req.body.holdername;
    const email=req.body.email;
    const cardNumber=Number(req.body.cardNumber);
    const expiry=req.body.expiry;
    const cvv=Number(req.body.cvv);
    const address=req.body.address;
    const city=req.body.city;
    const state=req.body.state;
    const zipcode=Number(req.body.zipcode);
    
    const newPayment = new Payment({
        holdername,
        email,
        cardNumber,
        expiry,
        cvv,
        address,
        city,
        state,
        zipcode
    });
    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    });
});

//Retreave Payment Data
router.get("/", (req, res) => {

    Payment.find().then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ status: "Error", error: err.message });
    });

});

//Update Payment Data
router.route("/update/:id").put(async (req, res) => {
    let payId = req.params.id;
    const{holdername,email,cardNumber,expiry,cvv,address,city,state,zipcode} = req.body;
try{
    const updatePayment = {
        holdername,
        email,
        cardNumber,
        expiry,
        cvv,
        address,
        city,
        state,
        zipcode
    }
    const update = await Payment.findByIdAndUpdate(payId,updatePayment, { new: true });

    if (!update) {
        return res.status(404).json({ status: "Error", error: "Payment not found" });
    }

    res.status(200).json({ status: "Payment Updated", user: update });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error", error: err.message });
    }
});
 
  //Delete Payment Details

  router.route("/delete/:id").delete(async (req, res) => {
    let payId = req.params.id;

    await Payment.findByIdAndDelete(payId)
    .then(()=>{
        res.status(200).send({status:"payment Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error With Dele Payement ",error:err.message});
    })
   });

// Fetch payment details by ID
router.get("/get/:id", async (req, res) => {
    try {
        const payId = req.params.id;
        const payment = await Payment.findById(payId);

        if (!payment) {
            return res.status(404).json({ status: "Error", error: "Payment not found" });
        }

        res.status(200).json({ status: "Payment Fetch", payment: payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with get Payment", error: err.message });
    }
});


// search card number
router.get("/getByCardNumber/:cardNumber", async (req, res) => {
    try {
        const cardNumber = req.params.cardNumber;
        const payment = await Payment.findOne({ cardNumber: cardNumber });

        if (!payment) {
            return res.status(404).json({ status: "Error", error: "Payment not found" });
        }

        res.status(200).json({ status: "Payment Fetch", payment: payment });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "Error with get Payment", error: err.message });
    }
});



module.exports = router;
