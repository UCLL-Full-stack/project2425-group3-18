import { Location } from '../model/location';
import database from './prisma/database';

const getAllLocations = async (): Promise<Location[]> => {
    try {
        const locationsPrisma = await database.location.findMany();
        return locationsPrisma.map((locationPrisma) => Location.from(locationPrisma));
    } catch (error) {
        throw new Error('Database error, see server log for more information');
    }
};

export default {
    getAllLocations,
};