"use server";

import { todoRouter } from "@/router/todo.route";

export const findManyTodo = todoRouter.findMany.actionable();
