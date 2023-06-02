import * as mongoose from "mongoose";
import { Role } from "./user.enum";


export const UserSchema = new mongoose.Schema({
    
    fullName:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum:Role,
        required: true
    }
    
})

export interface User extends mongoose.Document{
    id:string,
    fullName:string,
    password:string,
    role:Role
}
