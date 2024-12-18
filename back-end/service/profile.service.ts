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
    const profile = new Profile({ username, bio, role });
    return await profileDb.createProfile(profile, user);
};

/* wip
const deleteProfile = async (username: string): Promise<Profile> => {
    try {
        const profile = await getProfileByUsername(username);
        const posts = await postService.getPostsByUsername(username);
        //const comments = await commentService.getCommentsByUsername(username);


    } catch (error) {}
};
*/

export default {
    getAllProfiles,
    createProfile,
    getProfileByUsername,
};
