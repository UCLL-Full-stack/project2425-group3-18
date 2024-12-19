import kotService from '../../service/kot.service';
import kotDb from '../../repository/kot.db';
import profileService from '../../service/profile.service';
import { Kot } from '../../model/kot';
import { Location } from '../../model/location';
import { Profile } from '../../model/profile';
import { KotCreationInput } from '../../types';

let getAllKotenMock: jest.Mock;
let getProfileByUsernameMock: jest.Mock;
let createKotMock: jest.Mock;
let getAllKotenByProfileMock: jest.Mock;
let addProfileToKotMock: jest.Mock;

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

const mockProfile = new Profile({ id: 1, username: 'user1', bio: 'bio', role: role.user });
const mockLocation = new Location({
    city: 'CityName',
    street: 'StreetName',
    housenumber: 123,
});

beforeEach(() => {
    getAllKotenMock = jest.fn();
    getProfileByUsernameMock = jest.fn();
    createKotMock = jest.fn();
    getAllKotenByProfileMock = jest.fn();
    addProfileToKotMock = jest.fn();

    kotDb.getAllKoten = getAllKotenMock;
    profileService.getProfileByUsername = getProfileByUsernameMock;
    kotDb.createKot = createKotMock;
    kotDb.getAllKotenByProfile = getAllKotenByProfileMock;
    kotDb.addProfileToKot = addProfileToKotMock;
});

it('should get all koten', async () => {
    const mockKoten = [
        new Kot({
            location: mockLocation,
            price: 1000,
            surfaceSpace: 50,
            profiles: [mockProfile],
        }),
    ];

    getAllKotenMock.mockResolvedValue(mockKoten);

    const result = await kotService.getAllKoten();

    expect(result).toEqual(mockKoten);
    expect(getAllKotenMock).toHaveBeenCalledTimes(1);
});

it('should get koten by username', async () => {
    const mockKoten = [
        new Kot({
            location: mockLocation,
            price: 1000,
            surfaceSpace: 50,
            profiles: [mockProfile],
        }),
    ];

    getProfileByUsernameMock.mockResolvedValue(mockProfile);
    getAllKotenByProfileMock.mockResolvedValue(mockKoten);

    const result = await kotService.getKotenByUsername('user1');

    expect(result).toEqual(mockKoten);
    expect(getAllKotenByProfileMock).toHaveBeenCalledWith({ id: mockProfile.getId() });
});

it('should create a new kot', async () => {
    const kotCreationInput: KotCreationInput = {
        location: { city: 'CityName', street: 'StreetName', housenumber: 123 },
        price: 1000,
        surfaceSpace: 50,
        username: 'user1',
    };

    const mockKot = new Kot({
        location: mockLocation,
        price: 1000,
        surfaceSpace: 50,
        profiles: [mockProfile],
    });

    getProfileByUsernameMock.mockResolvedValue(mockProfile);
    createKotMock.mockResolvedValue(mockKot);

    const result = await kotService.createKot(kotCreationInput);

    expect(result.getLocation()).toEqual(mockLocation);
    expect(result.getPrice()).toBe(kotCreationInput.price);
    expect(result.getSurfaceSpace()).toBe(kotCreationInput.surfaceSpace);
    expect(result.getProfiles()).toEqual([mockProfile]);
    expect(createKotMock).toHaveBeenCalledTimes(1);
});

it('should add a profile to an existing kot', async () => {
    const kotId = 1;

    getProfileByUsernameMock.mockResolvedValue(mockProfile);
    addProfileToKotMock.mockResolvedValue(
        new Kot({
            location: mockLocation,
            price: 1000,
            surfaceSpace: 50,
            profiles: [mockProfile],
        })
    );

    const result = await kotService.addProfileToKot('user1', kotId);

    expect(result.getProfiles()).toContain(mockProfile);
    expect(addProfileToKotMock).toHaveBeenCalledWith(mockProfile.getId(), kotId);
});
