import profileService from '../../service/profile.service';
import profileDb from '../../repository/profile.db';
import postService from '../../service/post.service';
import commentService from '../../service/comment.service';
import userService from '../../service/user.service';
import { Profile } from '../../model/profile';
import { ProfileInput } from '../../types';

let getAllProfilesMock: jest.Mock;
let getProfileByUsernameMock: jest.Mock;
let createProfileMock: jest.Mock;
let deleteProfileMock: jest.Mock;
let makeModeratorMock: jest.Mock;
let makeUserMock: jest.Mock;
let getUserByEmailMock: jest.Mock;
let deleteAllProfilePostsMock: jest.Mock;
let deleteAllProfileCommentsMock: jest.Mock;

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

const mockProfile = new Profile({ id: 1, username: 'user1', bio: 'bio', role: role.user });

beforeEach(() => {
    getAllProfilesMock = jest.fn();
    getProfileByUsernameMock = jest.fn();
    createProfileMock = jest.fn();
    deleteProfileMock = jest.fn();
    makeModeratorMock = jest.fn();
    makeUserMock = jest.fn();
    getUserByEmailMock = jest.fn();
    deleteAllProfilePostsMock = jest.fn();
    deleteAllProfileCommentsMock = jest.fn();

    profileDb.getAllProfiles = getAllProfilesMock;
    profileDb.getProfileByUsername = getProfileByUsernameMock;
    profileDb.createProfile = createProfileMock;
    profileDb.deleteProfile = deleteProfileMock;
    profileDb.makeModerator = makeModeratorMock;
    profileDb.makeUser = makeUserMock;
    userService.getUserByEmail = getUserByEmailMock;
    postService.deleteAllProfilePosts = deleteAllProfilePostsMock;
    commentService.deleteAllProfileComments = deleteAllProfileCommentsMock;
});

it('should get all profiles', async () => {
    const mockProfiles = [mockProfile];

    getAllProfilesMock.mockResolvedValue(mockProfiles);

    const result = await profileService.getAllProfiles();

    expect(result).toEqual(mockProfiles);
    expect(getAllProfilesMock).toHaveBeenCalledTimes(1);
});

it('should get profile by username', async () => {
    getProfileByUsernameMock.mockResolvedValue(mockProfile);

    const result = await profileService.getProfileByUsername('user1');

    expect(result).toEqual(mockProfile);
    expect(getProfileByUsernameMock).toHaveBeenCalledWith({ username: 'user1' });
});

it('should throw an error if profile does not exist when getting profile by username', async () => {
    getProfileByUsernameMock.mockResolvedValue(null);

    await expect(profileService.getProfileByUsername('nonexistentUser')).rejects.toThrow(
        'Profile with username nonexistentUser does not exist.'
    );
});

it('should create a new profile', async () => {
    const profileInput: ProfileInput = { username: 'user2', bio: 'bio', role: role.user };
    const mockUser = { id: 1, email: 'user2@example.com' };

    getUserByEmailMock.mockResolvedValue(mockUser);
    createProfileMock.mockResolvedValue(new Profile({ ...profileInput, id: 2 }));

    const result = await profileService.createProfile(profileInput, mockUser.email);

    expect(result.getUsername()).toBe(profileInput.username);
    expect(result.getRole()).toBe(profileInput.role);
    expect(createProfileMock).toHaveBeenCalledTimes(1);
});

it('should throw an error if profile with username already exists when creating profile', async () => {
    const profileInput: ProfileInput = { username: 'user1', bio: 'bio', role: role.user };

    getProfileByUsernameMock.mockResolvedValue(mockProfile);

    await expect(
        profileService.createProfile(profileInput, 'user1@example.com')
    ).rejects.toThrowError('Profile with username user1 already exists.');
});

it('should delete profile', async () => {
    deleteAllProfilePostsMock.mockResolvedValue(null);
    deleteAllProfileCommentsMock.mockResolvedValue(null);
    deleteProfileMock.mockResolvedValue(mockProfile);

    const result = await profileService.deleteProfile('user1');

    expect(result).toEqual(mockProfile);
    expect(deleteProfileMock).toHaveBeenCalledWith({ username: 'user1' });
    expect(deleteAllProfilePostsMock).toHaveBeenCalledWith('user1');
    expect(deleteAllProfileCommentsMock).toHaveBeenCalledWith('user1');
});

it('should throw an error if profile could not be deleted', async () => {
    deleteAllProfilePostsMock.mockRejectedValue(new Error('Error deleting posts'));
    deleteAllProfileCommentsMock.mockRejectedValue(new Error('Error deleting comments'));

    await expect(profileService.deleteProfile('user1')).rejects.toThrow(
        'Profile could not be deleted!'
    );
});

it('should throw an error if user is not admin when making moderator', async () => {
    await expect(profileService.makeModerator('user1', 'User')).rejects.toThrow(
        'You must be an admin to be allowed to use this function.'
    );
});

it('should make user a regular user', async () => {
    const mockAdminProfile = new Profile({
        id: 1,
        username: 'admin',
        bio: 'admin bio',
        role: role.admin,
    });

    makeUserMock.mockResolvedValue(mockProfile);

    const result = await profileService.makeUser('user1', 'Admin');

    expect(result.getRole()).toBe('User');
    expect(makeUserMock).toHaveBeenCalledWith({ username: 'user1' });
});

it('should throw an error if user is not admin when making regular user', async () => {
    await expect(profileService.makeUser('user1', 'User')).rejects.toThrow(
        'You must be an admin to be allowed to use this function.'
    );
});
