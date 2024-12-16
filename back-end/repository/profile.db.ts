import { Profile } from '../model/profile';
import { User } from '../model/user';
import database from './prisma/database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany({});
        return profilesPrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        throw new Error('Database error, see server log for more information.');
    }
};

const createProfile = async (profile: Profile, user: User): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.create({
            data: {
                username: profile.getUsername(),
                bio: profile.getBio(),
                role: profile.getRole(),
                user: {
                    connect: { id: user.getId() },
                },
            },
        });
        return Profile.from(profilePrisma);
    } catch (error) {
        throw new Error('Error creating profile.');
    }
};

export default {
    getAllProfiles,
    createProfile,
};
