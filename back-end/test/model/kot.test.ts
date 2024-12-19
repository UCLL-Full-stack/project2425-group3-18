import { Kot } from '../../model/kot';
import { Profile } from '../../model/profile';
import { Location } from '../../model/location';

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

const mockProfile1 = new Profile({
    id: 1,
    username: 'test_user1',
    bio: 'Nature lover',
    role: role.user,
});

const mockProfile2 = new Profile({
    id: 2,
    username: 'test_user2',
    bio: 'Kot enthusiast',
    role: role.moderator,
});

const mockLocation = new Location({
    id: 1,
    city: 'Leuven',
    street: 'Bondgenotenlaan',
    housenumber: 23,
});

describe('Kot', () => {
    test('given: valid values for Kot, when: Kot is created, then: Kot is created with those values', () => {
        // given
        const kotData = {
            id: 1,
            location: mockLocation,
            price: 500,
            surfaceSpace: 25,
            profiles: [mockProfile1, mockProfile2],
        };

        // when
        const kot = new Kot(kotData);

        // then
        expect(kot.getId()).toEqual(kotData.id);
        expect(kot.getLocation()).toEqual(mockLocation);
        expect(kot.getPrice()).toEqual(kotData.price);
        expect(kot.getSurfaceSpace()).toEqual(kotData.surfaceSpace);
        expect(kot.getProfiles()).toEqual([mockProfile1, mockProfile2]);
    });

    test('given: an existing Kot, when: setting a new price, then: price is updated', () => {
        // given
        const initialPrice = 600;
        const updatedPrice = 700;
        const kot = new Kot({
            id: 1,
            location: mockLocation,
            price: initialPrice,
            surfaceSpace: 30,
            profiles: [mockProfile1],
        });

        // when
        kot.setPrice(updatedPrice);

        // then
        expect(kot.getPrice()).toEqual(updatedPrice);
    });

    test('given: a Kot, when: setting invalid price, then: an error is thrown', () => {
        // given
        const kot = new Kot({
            id: 1,
            location: mockLocation,
            price: 700,
            surfaceSpace: 40,
            profiles: [mockProfile1],
        });

        // when & then
        expect(() => kot.setPrice(-100)).toThrow('Price must be greater than zero');
    });

    test('given: a Kot, when: retrieving the profiles, then: associated profiles are returned', () => {
        // given
        const kot = new Kot({
            id: 1,
            location: mockLocation,
            price: 800,
            surfaceSpace: 50,
            profiles: [mockProfile1, mockProfile2],
        });

        // when
        const profiles = kot.getProfiles();

        // then
        expect(profiles).toEqual([mockProfile1, mockProfile2]);
    });

    test('given: a Kot, when: retrieving the location, then: associated location is returned', () => {
        // given
        const kot = new Kot({
            id: 1,
            location: mockLocation,
            price: 900,
            surfaceSpace: 35,
            profiles: [mockProfile1],
        });

        // when
        const location = kot.getLocation();

        // then
        expect(location).toEqual(mockLocation);
    });

    test('given: two Kots with the same values, when: comparing them, then: equals method returns true', () => {
        // given
        const kotData = {
            id: 1,
            location: mockLocation,
            price: 1000,
            surfaceSpace: 45,
            profiles: [mockProfile1],
        };
        const kot1 = new Kot(kotData);
        const kot2 = new Kot(kotData);

        // when
        const isEqual = kot1.equals(kot2);

        // then
        expect(isEqual).toBe(true);
    });

    test('given: two Kots with different values, when: comparing them, then: equals method returns false', () => {
        // given
        const kot1 = new Kot({
            id: 1,
            location: mockLocation,
            price: 400,
            surfaceSpace: 30,
            profiles: [mockProfile1],
        });
        const differentLocation = new Location({
            id: 2,
            city: 'Antwerp',
            street: 'Meir',
            housenumber: 12,
        });
        const kot2 = new Kot({
            id: 2,
            location: differentLocation,
            price: 1200,
            surfaceSpace: 60,
            profiles: [mockProfile2],
        });

        // when
        const isEqual = kot1.equals(kot2);

        // then
        expect(isEqual).toBe(false);
    });

    test('given: a Kot, when: adding a new profile, then: profile is added to the profiles array', () => {
        // given
        const kot = new Kot({
            id: 1,
            location: mockLocation,
            price: 850,
            surfaceSpace: 38,
            profiles: [mockProfile1],
        });

        // when
        kot.addProfile(mockProfile2);

        // then
        expect(kot.getProfiles()).toEqual([mockProfile1, mockProfile2]);
    });
});
