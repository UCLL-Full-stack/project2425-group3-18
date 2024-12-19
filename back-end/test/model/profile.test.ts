import { Profile } from '../../model/profile';

const validUsername = 'test_user';
const validBio = 'A short bio about the user.';
const validRole = 'User';

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

describe('Profile', () => {
    // Happy Path Tests
    test('given valid values, when Profile is created, then Profile is created with those values', () => {
        const profile = new Profile({
            id: 1,
            username: validUsername,
            bio: validBio,
            role: role.user,
        });

        expect(profile.getId()).toEqual(1);
        expect(profile.getUsername()).toEqual(validUsername);
        expect(profile.getBio()).toEqual(validBio);
        expect(profile.getRole()).toEqual(validRole);
    });

    test('given a Profile, when setting a new username, then username is updated', () => {
        const profile = new Profile({
            id: 1,
            username: validUsername,
            bio: validBio,
            role: role.user,
        });

        const newUsername = 'new_user';
        profile.setUsername(newUsername);

        expect(profile.getUsername()).toEqual(newUsername);
    });

    test('given two Profiles with the same values, when compared, then equals method returns true', () => {
        const profile1 = new Profile({
            id: 1,
            username: validUsername,
            bio: validBio,
            role: role.user,
        });

        const profile2 = new Profile({
            id: 1,
            username: validUsername,
            bio: validBio,
            role: role.user,
        });

        expect(profile1.equals(profile2)).toBe(true);
    });

    // Unhappy Path Tests
    test('given an empty username, when creating a Profile, then it throws an error', () => {
        expect(() => {
            new Profile({ id: 1, username: '', bio: validBio, role: role.user });
        }).toThrow('Name cannot be empty');
    });
});
