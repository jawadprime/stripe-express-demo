import { CustomerId, HasCustomerId, ok, Result, UserId } from "@stripe-express-demo/shared";
import { IUserRepo } from "../application/user-repo";

export class UserRepo implements IUserRepo{
    async FindUserCustomerId(userId: UserId): Promise<Result<CustomerId>> {
       return ok(new HasCustomerId("cus_NffrFeUfNV2Hib"));
    }
}