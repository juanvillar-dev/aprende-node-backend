import { BcryptAdapter } from "../../config/bcrypt.adapter.js";
import { CustomError, UserEntity, type IUserRepository } from "../../domain/index.js";
import type { IUserService } from "../../domain/services/user.service.js";

export class UserService implements IUserService {
    constructor (readonly userRepository: IUserRepository){}



    async createUser(user: any): Promise<UserEntity> {
        const newUser = await this.userRepository.createUser(user);
        return UserEntity.fromModel(newUser);
    }



    async findAllUsers(): Promise<UserEntity[]> {
        const users = await this.userRepository.findAllUsers();
        return (users ?? []).map((user: any) => UserEntity.fromModel(user));
    }



    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findUserByEmail(email);
        if(!user)
            throw CustomError.notFound("Usuario no encontrado", "UserService.findUserByEmail");

        return UserEntity.fromModel(user);
    }



    async findUserById(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findUserById(id);
        if(!user)
            throw CustomError.notFound("Usuario no encontrado", "UserService.findUserById");

        return UserEntity.fromModel(user);
    }



    async updateUser(id: string, user: any): Promise<UserEntity> {
        const data: Record<string, any> = Object.fromEntries(
            Object.entries(user).filter(([, value]) => value !== undefined)
        );

        if(data.password)
            data.password = BcryptAdapter.hash(data.password);

        const updatedUser = await this.userRepository.updateUser(id, data);
        if(!updatedUser)
            throw CustomError.notFound("Usuario no encontrado", "UserService.updateUser");

        return UserEntity.fromModel(updatedUser);
    }



    async deleteUser(id: string): Promise<UserEntity> {
        const deletedUser = await this.userRepository.deleteUser(id);
        if(!deletedUser)
            throw CustomError.notFound("Usuario no encontrado", "UserService.deleteUser");

        return UserEntity.fromModel(deletedUser);
    }


}
