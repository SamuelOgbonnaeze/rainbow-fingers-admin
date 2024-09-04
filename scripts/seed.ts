const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.courseCategory.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Photography" },
                { name: "Video Editing" },
                { name: "Filming" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Accounting" },
            ]
        })

        console.log('Success')
    } catch (error) {
        console.log("Error seeding the database categories", error)
    } finally {
        await database.$disconnect();
    }
}

main();