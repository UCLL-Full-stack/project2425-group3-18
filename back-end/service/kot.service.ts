import { Kot } from '../model/kot';
import { Location } from '../model/location';
import { Profile } from '../model/profile';
import kotDb from '../repository/kot.db';
import { KotInput } from '../types';
import profileService from './profile.service';

const getAllKoten = (): Promise<Kot[]> => {
    return kotDb.getAllKoten();
};

const getKotenByUsername = async (username: string): Promise<Kot[]> => {
    const id = (await profileService.getProfileByUsername(username)).getId();
    if (!id) {
        throw new Error("Profile doesn't exist.");
    }
    return await kotDb.getAllKotenByProfile({ id });
};

const createKot = async ({ location, price, surfaceSpace, profiles }: KotInput): Promise<Kot> => {
    const loc = new Location({
        city: location.city,
        street: location.street,
        housenumber: location.housenumber,
    });

    if (!profiles) {
        throw new Error('Please add an array of profiles related to the kot.');
    }

    const arr: Profile[] = [];
    profiles.forEach(async (profile) => {
        const p = await profileService.getProfileByUsername(profile.username);
        arr.push(p);
    });

    const kot = new Kot({ location: loc, price, surfaceSpace, profiles: arr });

    return await kotDb.createKot(kot);
};

const addProfileToKot = async (username: string, kotId: number): Promise<Kot> => {
    const id = (await profileService.getProfileByUsername(username)).getId();
    if (!id) {
        throw new Error("Profile doesn't exist.");
    }
    return await kotDb.addProfileToKot(id, kotId);
};

export default {
    getAllKoten,
    getKotenByUsername,
    createKot,
    addProfileToKot,
};
