import { UserId, Result, CustomerId } from "@stripe-express-demo/shared";

export interface IUserRepo{
    FindUserCustomerId(userId: UserId): Promise<Result<CustomerId>>
}