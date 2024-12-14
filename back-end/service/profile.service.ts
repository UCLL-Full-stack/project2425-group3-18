import { Kot } from '../model/kot';
import { Post } from '../model/post';
import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import userDb from '../repository/user.db';
import { ProfileInput } from '../types';

const getAllProfiles = (): Promise<Profile[]> => {
    return profileDb.getAllProfiles();
};

export default {
    getAllProfiles,
};
