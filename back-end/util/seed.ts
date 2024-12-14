import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    await prisma.comment.deleteMany();
    await prisma.kot.deleteMany();
    await prisma.location.deleteMany();
    await prisma.post.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
            username: 'Buuuldog',
            email: 'thomas.vandenhoudt@gmail.com',
            password: 'thomas123',
            profile: {
                create: {
                    firstName: 'Thomas',
                    lastName: 'Van den houdt',
                    bio: 'just a user',
                    role: 'User',
                    posts: {
                        create: [
                            {
                                description: 'nice post1',
                                image: 'to be turned into a model',
                            },
                        ],
                    },
                    koten: {
                        create: [
                            {
                                location: {
                                    create: {
                                        city: 'leuven',
                                        street: 'Dirk Boutslaan',
                                        housenumber: 12,
                                    },
                                },
                                price: 500,
                                surfaceSpace: 12,
                            },
                        ],
                    },
                },
            },
        },
    });
    const user2 = await prisma.user.create({
        data: {
            username: 'DaanGamemeneer',
            email: 'daan.hoeven@gmail.com',
            password: 'daan123',
            profile: {
                create: {
                    firstName: 'Daan',
                    lastName: 'Hoeven',
                    bio: 'just a user',
                    role: 'User',
                    posts: {
                        create: [
                            {
                                description: 'I like my new kot',
                                image: 'idk',
                                comments: {
                                    create: [
                                        {
                                            text: 'wow cool ',
                                            profileId: user1.id,
                                        },
                                    ],
                                },
                            },
                            {
                                description: 'new plant',
                                image: 'afbeelding van een plant ofzo',
                            },
                        ],
                    },
                    koten: {
                        create: [
                            {
                                location: {
                                    create: {
                                        city: 'leuven',
                                        street: 'Dirk Boutslaan',
                                        housenumber: 16,
                                    },
                                },
                                price: 532,
                                surfaceSpace: 13,
                            },
                        ],
                    },
                },
            },
        },
    });
    const user3 = await prisma.user.create({
        data: {
            username: 'Kotenmaster',
            email: 'koten.master@gmail.com',
            password: 'kotenmaster123',
            profile: {
                create: {
                    firstName: 'Harry',
                    lastName: 'Potter',
                    bio: 'The admin of this site',
                    role: 'Admin',
                    koten: {
                        create: [
                            {
                                location: {
                                    create: {
                                        city: 'Gent',
                                        street: 'Brugstraat',
                                        housenumber: 35,
                                    },
                                },
                                price: 350,
                                surfaceSpace: 7,
                            },
                            {
                                location: {
                                    create: {
                                        city: 'leuven',
                                        street: 'Vaartkom',
                                        housenumber: 33,
                                    },
                                },
                                price: 900,
                                surfaceSpace: 25,
                            },
                        ],
                    },
                },
            },
        },
    });
    const user4 = await prisma.user.create({
        data: {
            username: 'Kotenmoderator',
            email: 'koten.moderator@gmail.com',
            password: 'kotenmoderator123',
            profile: {
                create: {
                    firstName: 'Percy',
                    lastName: 'Jackson',
                    bio: 'A moderator of this site',
                    role: 'Moderator',
                    koten: {
                        create: [
                            {
                                location: {
                                    create: {
                                        city: 'leuven',
                                        street: 'Dellenhof',
                                        housenumber: 18,
                                    },
                                },
                                price: 550,
                                surfaceSpace: 12,
                            },
                        ],
                    },
                },
            },
        },
    });
}
(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
