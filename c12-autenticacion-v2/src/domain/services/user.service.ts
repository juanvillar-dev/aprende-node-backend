import type { UserEntity } from "../entities/user.entity.js";

export interface IUserService{
    createUser(user: any): Promise<UserEntity>;
    findAllUsers(): Promise<UserEntity[]>;
    findUserByEmail(email: string): Promise<UserEntity>;
    findUserById(id: string): Promise<UserEntity>;
    updateUser(id: string, user: any): Promise<UserEntity>;
    deleteUser(id: string): Promise<UserEntity>;
}