const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const appointmentSchema=new Schema({
     firstName:{
        type:String,
        required:true
     },
     lastName:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true
     },
     message:{
        type:String,
        required:true
     },
     date : {
        type: String,
        required:true
     },
     time : {
        type: String,
        required:true
     }
})

const Appointment=mongoose.model("Appointment",appointmentSchema);

module.exports=Appointment;