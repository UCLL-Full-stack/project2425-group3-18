import { Profile } from '../model/profile';

const profiles: Profile[] = [];

const getAllProfiles = (): Profile[] => {
    return profiles;
};

export default {
    getAllProfiles,
};
