export class CategoryEntity {
    constructor(
        public readonly id: string,
        public name: string,
        public available: boolean = true,
        public user: string,
    ){}


    static fromModel(object: any): CategoryEntity {
        const { id, _id, name, available, user } = object;

        const userId = user?._id?.toString() ?? user?.toString();

        return new CategoryEntity((_id ?? id)?.toString(), name, available, userId);
    }
}
