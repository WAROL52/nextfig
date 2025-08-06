import { sse } from "./sse.route";
import { userRoute } from "./user.route";

export const router = {
    sse,
    user: userRoute,
};
