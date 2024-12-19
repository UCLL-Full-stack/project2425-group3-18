import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import { ProfileInput } from '../types';
import commentService from './comment.service';
import postService from './post.service';
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
    if (await profileDb.getProfileByUsername({ username })) {
        throw new Error(`Profile with username ${username} already exists.`);
    }
    const user = await userService.getUserByEmail(email);
    const profile = new Profile({ username, bio, role});
    return await profileDb.createProfile(profile, user);
};

const deleteProfile = async (username: string): Promise<Profile> => {
    try {
        await postService.deleteAllProfilePosts(username);
        await commentService.deleteAllProfileComments(username);
        return await profileDb.deleteProfile({ username });
    } catch (error) {
        throw new Error('Profile could not be deleted!');
    }
};

const makeModerator = async (username: string, role: string): Promise<Profile> => {
    if (role !== 'Admin') {
        throw new Error('You must be an admin to be allowed to use this function.');
    }
    return await profileDb.makeModerator({ username });
};

const makeUser = async (username: string, role: string): Promise<Profile> => {
    if (role !== 'Admin') {
        throw new Error('You must be an admin to be allowed to use this function.');
    }
    return await profileDb.makeUser({ username });
};

export default {
    getAllProfiles,
    createProfile,
    getProfileByUsername,
    deleteProfile,
    makeUser,
    makeModerator,
};
