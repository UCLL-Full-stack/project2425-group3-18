import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';

const getAllServices = (): Profile[] => {
    return profileDb.getAllProfiles();
};

export default {
    getAllServices,
};
