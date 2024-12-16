import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import { ProfileInput } from '../types';
import userService from './user.service';

const getAllProfiles = (): Promise<Profile[]> => {
    return profileDb.getAllProfiles();
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
    createProfile
};
