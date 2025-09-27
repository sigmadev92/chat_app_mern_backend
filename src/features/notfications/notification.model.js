import mongoose from mongoose;

const notificationSchema = new mongoose.Schema({
     text:{
        type:String,
        required:true,
     },
     userId:{
        type:mongoose.Type.Schema.ObjectID,
        ref:"User",
     }

},{timestamps:true})

const Notifications = mongoose.model("Notification",notificationSchema);

export default Notifications;