import { faker } from "@faker-js/faker/locale/fr";

import prisma from "@/lib/prisma";

import { Prisma } from "@/generated/prisma";

function generateTodoData(): Prisma.TodoCreateInput {
    return {
        title: faker.person.jobTitle(),
        description: faker.person.jobDescriptor(),
        image: faker.image.dataUri(),
        status: faker.helpers.arrayElement([
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
        ]),
    };
}
export async function makeTodoSeed(count: number = 1) {
    await prisma.todo.createMany({
        data: Array.from({ length: count }, () => generateTodoData()),
    });
}
