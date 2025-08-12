// prisma
import { makeTodoSeed } from "./seeds/todo.seed";

async function main() {
    await makeTodoSeed(100);
}

main()
    .then(async () => {
        console.log("Seeding completed successfully.");
        await process.exit(0);
    })
    .catch(async (e) => {
        console.error("Error during seeding:", e);
        await process.exit(1);
    });
