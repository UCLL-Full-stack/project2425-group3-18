import { triggerAsyncId } from 'async_hooks';
import { Kot } from '../model/kot';
import { Profile } from '../model/profile';
import database from './prisma/database';

const getAllKoten = async (): Promise<Kot[]> => {
    try {
        const kotenPrisma = await database.kot.findMany({
            include: {
                location: true,
                profiles: true,
            },
        });
        return kotenPrisma.map((kotPrisma) => Kot.from(kotPrisma));
    } catch (error) {
        throw new Error('Database error, see server log for more information');
    }
};

const getAllKotenByProfile = async ({ id }: { id: number }): Promise<Kot[]> => {
    try {
        const kotenPrisma = await database.kot.findMany({
            where: {
                profiles: {
                    some: {
                        id,
                    },
                },
            },
            include: {
                location: true,
                profiles: true,
            },
        });
        return kotenPrisma.map((kotPrisma) => Kot.from(kotPrisma));
    } catch (error) {
        throw new Error('Database error finding koten by profile');
    }
};

const createKot = async (kot: Kot): Promise<Kot> => {
    try {
        const kotPrisma = await database.kot.create({
            data: {
                location: {
                    create: {
                        city: kot.getLocation().getCity(),
                        street: kot.getLocation().getStreet(),
                        housenumber: kot.getLocation().getHousenumber(),
                    },
                },
                price: kot.getPrice(),
                surfaceSpace: kot.getSurfaceSpace(),
                profiles: {
                    connect: kot.getProfiles().map((profile) => ({ id: profile.getId() })),
                },
            },
            include: {
                location: true,
                profiles: true,
            },
        });
        return Kot.from(kotPrisma);
    } catch (error) {
        throw new Error('Database error creating kot.');
    }
};

const addProfileToKot = async (profileId: number, kotId: number): Promise<Kot> => {
    try {
        const kotPrisma = await database.kot.update({
            where: {
                id: kotId,
            },
            data: {
                profiles: {
                    connect: {
                        id: profileId,
                    },
                },
            },
            include: {
                location: true,
                profiles: true,
            },
        });
        return Kot.from(kotPrisma);
    } catch (error) {
        throw new Error('Database error adding profile to kot.');
    }
};

export default {
    getAllKoten,
    getAllKotenByProfile,
    createKot,
    addProfileToKot,
};
