import { Kot } from '../model/kot';
import { Post } from '../model/post';
import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import userDb from '../repository/user.db';
import { ProfileInput } from '../types';

const getAllProfiles = (): Profile[] => {
    return profileDb.getAllProfiles();
};

const createProfile = (profileInput: ProfileInput, userEmail: string): Profile => {
    const kotenList: Kot[] = [];
    const postList: Post[] = [];

    const user = userDb.getUserByEmail(userEmail);

    const newProfile = new Profile({
        firstName: profileInput.firstName,
        lastName: profileInput.lastName,
        bio: profileInput.bio,
        role: profileInput.role,
        user: user,
        koten: kotenList,
        posts: postList,
    });
    return profileDb.createProfile(newProfile);
};

export default {
    getAllProfiles,
    createProfile,
};
