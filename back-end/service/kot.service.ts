import { Kot } from '../model/kot';
import kotDb from '../repository/kot.db';
import profileService from './profile.service';

const getAllKoten = (): Promise<Kot[]> => {
    return kotDb.getAllKoten();
};

const getKotenByUsername = async (username: string): Promise<Kot[]> => {
    const id = (await profileService.getProfileByUsername(username)).getId();
    if (!id) {
        throw new Error();
    }
    return await kotDb.getAllKotenByProfile({ id });
};

export default {
    getAllKoten,
    getKotenByUsername,
};
