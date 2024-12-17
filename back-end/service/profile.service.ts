import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import { ProfileInput } from '../types';
import userService from './user.service';

const getAllProfiles = (): Promise<Profile[]> => {
    return profileDb.getAllProfiles();
};

const getProfileByUsername = async (username: string): Promise<Profile> => {
    const profile = await profileDb.getProfileByUsername({ username });
    if (profile === null) {
        throw new Error(`Profile with username ${username} does not exist.`);
    }
    return profile;
};

const createProfile = async (
    { username, bio, role }: ProfileInput,
    email: string
): Promise<Profile> => {
    const user = await userService.getUserByEmail(email);
    const profile = new Profile({ username, bio, role });
    return await profileDb.createProfile(profile, user);
};

export default {
    getAllProfiles,
    createProfile,
    getProfileByUsername,
};
