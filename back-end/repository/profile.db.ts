import { Profile } from '../model/profile';

const profiles: Profile[] = [];

const getAllProfiles = (): Profile[] => {
    return profiles;
};

const createProfile = (profileData: Profile): Profile => {
    const newProfile = new Profile({
        firstName: profileData.getFirstName(),
        lastName: profileData.getLastName(),
        bio: profileData.getBio(),
        role: profileData.getRole(),
        user: profileData.getUser(),
        posts: profileData.getPosts(),
        koten: profileData.getKoten(),
    });
    profiles.push(newProfile);
    return newProfile;
};

export default {
    getAllProfiles,
    createProfile,
};
