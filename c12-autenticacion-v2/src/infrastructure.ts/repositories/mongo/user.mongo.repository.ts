import mongoose from "mongoose";
import { UserModel } from "../../../data/index.js";
import { CustomError, type IUserRepository } from "../../../domain/index.js";

export class UserMongoRepository implements IUserRepository {
    constructor(){}


    findAllUsers(): Promise<any> {
        return UserModel.find();
    }



    createUser(user: any): Promise<any> {
        const { name, email, password} = user;
        const newUser = new UserModel({ name, email, password });
        return newUser.save();
    }



    findUserByEmail(email: string): Promise<any> {
        return UserModel.findOne({ email : email });
    }



    findUserById(id: string): Promise<any> {
        if(!mongoose.Types.ObjectId.isValid(id))
            throw CustomError.badRequest("El id es invalido");
        return UserModel.findById(id);
    }



    updateUser(id: string, user: any): Promise<any> {
        if(!mongoose.Types.ObjectId.isValid(id))
            throw CustomError.badRequest("El id es invalido");
        return UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true });
    }



    deleteUser(id: string): Promise<any> {
        if(!mongoose.Types.ObjectId.isValid(id))
            throw CustomError.badRequest("El id es invalido");
        return UserModel.findByIdAndDelete(id);
    }
}