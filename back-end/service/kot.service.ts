import { Kot } from '../model/kot';
import { Location } from '../model/location';
import { Profile } from '../model/profile';
import kotDb from '../repository/kot.db';
import { KotCreationInput, KotInput } from '../types';
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

const createKot = async ({
    location,
    price,
    surfaceSpace,
    username,
}: KotCreationInput): Promise<Kot> => {
    console.log(location);
    const loc = new Location({
        city: location.city,
        street: location.street,
        housenumber: location.housenumber,
    });

    const arr: Profile[] = [];
    const profile = await profileService.getProfileByUsername(username);
    arr.push(profile)

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
