import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const actionWithAuth = action.use(({ next }) => {
  return next();
});
