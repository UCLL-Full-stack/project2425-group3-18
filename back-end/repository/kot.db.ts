import { Kot } from '../model/kot';
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

export default {
    getAllKoten,
};
