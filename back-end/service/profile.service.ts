import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';

const getAllProfiles = (): Profile[] => {
    return profileDb.getAllProfiles();
};

export default {
    getAllProfiles,
};
