import { Profile } from '../model/profile';
import database from './prisma/database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({});
        return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        throw new Error('Database error, see server log for more information.');
    }
};

/*
const createProfile = async (profileData: Profile) => {
    try {
        await database.profile.create(profileData)
    } catch (error) {
        throw new Error('Database error, see server log for more information.')
    }
};
*/

export default {
    getAllProfiles,
    //createProfile,
};
