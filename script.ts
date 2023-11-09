import { PrismaClient, Role } from '@prisma/client'
const prisma = new PrismaClient()
// const prisma = new PrismaClient({ log: ['query'] })

async function main() {
    // await prisma.user.create({ data: { name: 'Alice' } })
    // await prisma.user.create({ data: { name: 'Sally' } })
    // const user = await prisma.user.findMany()

    await prisma.user.deleteMany()
    const user = await prisma.user.create({
        data: {
            name: "Bob",
            age: 20,
            email: "bob@boo.com",
            password: "123456",
            userPreference: {
                create: {
                    emailNotification: true,
                }
            }
        },
        // include: {
        //     userPreference: true
        // },
        select: {
            name: true,
            // userPreference: true
            userPreference: { select: { emailNotification: true } }
        },
    })

    const users = await prisma.user.createMany({
        data: [
            {
                name: "Sally",
                age: 22,
                email: "sally@sui.com",
                password: "123321",
            },
            {
                name: "Kitty",
                age: 27,
                email: "killy@kit.com",
                password: "212112",
            }
        ]
    })

    const user2 = await prisma.user.findUnique({
        where: {
            // email: "bob@boo.com"
            name_age: {
                age: 20,
                name: "Bob"
            }
        }
    })

    const user3 = await prisma.user.findFirst({
        where: {
            name: "Bob",
            // name: {equals: "Bob"},
            // name: { not: "Bob" },
            // name: { in: ["Bob"] },
            // name: { notIn: ["Bob"] },
            age: { lt: 30 },
            // email: { contains: "@gmail.com" },
            // email: { startsWith: "bob" },
            email: { endsWith: "@gmail.com" },
        },
        // distinct: ["name", "age"],
        orderBy: {
            age: "desc"
        },
        take: 2,
        skip: 1,
    })

    const user4 = await prisma.user.findMany({
        where: {
            // name: "Bob",
            // NOT: {email: { contains: "@gmail.com" }}
            // writtenPosts: {
            //     every: {
            //         title: {startsWith: "A"}
            //     }
            // },
            AND: [
                { email: { startsWith: "bob" } },
                { age: { gt: 20 } }
            ]
        }
    })

    const posts = await prisma.post.findMany({
        where: {
            author: {
                is: {
                    name: "Bob"
                }
            }
        }
    })

    const user5 = await prisma.user.update({
        data: {
            // age: {
            //     increment: 1
            //     decrement: 1
            //     multiply: 1
            //     divide: 1
            // }
            email: "bob@boo.com2",
            // when single update, the field is should be unique
            // userPreference: {
            //     disconnect: true
            //     connect: {
            //         id: '3d3sd-3rd-fgg-3rf'
            //     }
            // }
        },
        where: {
            email: "bob@boo.com"
        }
    })

    const user6 = await prisma.user.updateMany({
        data: {
            name: "Sally"
        },
        where: {
            email: "new@sally.com"
        }
        // select or include is not allowed in updateMany
    })

    await prisma.user.delete({
        where: {
            // age: {gt: 20}
            email: "Sally"
        }
    })

    await prisma.user.deleteMany({})

    console.log(posts)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })