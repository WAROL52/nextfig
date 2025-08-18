import { sse } from "./sse.route";
import { todoRouter } from "./todo.route";
import { userRoute } from "./user.route";

export const router = {
    sse,
    user: userRoute,
    todo: todoRouter,
};
