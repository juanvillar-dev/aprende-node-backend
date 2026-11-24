export interface IUserRepository{
    createUser(user: any): Promise<any>;
    findAllUsers(): Promise<any>
    findUserByEmail(email: string): Promise<any>;
    findUserById(id: string): Promise<any>;
    updateUser(id: string, user: any): Promise<any>;
    deleteUser(id: string): Promise<any>;
}