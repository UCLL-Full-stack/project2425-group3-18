import { Kot } from '../../model/kot';
import { Post } from '../../model/post';
import { Profile } from '../../model/profile';
import { User } from '../../model/user';
import kotDb from '../../repository/kot.db';
import profileDb from '../../repository/profile.db';
import kotService from '../../service/kot.service';
import profileService from '../../service/profile.service';

// Mock Data
const mockUser = new User({
    userName: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123',
});

const mockPosts: Post[] = [
    new Post({
        description: 'Sample post 1',
        image: 'sample-image1.jpg',
        comments: [],
    }),
    new Post({
        description: 'Sample post 2',
        image: 'sample-image2.jpg',
        comments: [],
    }),
];

const mockProfile = new Profile({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'This is a bio.',
    role: 'User',
    user: mockUser,
    posts: mockPosts,
    koten: [],
});

mockUser.setProfile(mockProfile);

const mockProfiles: Profile[] = [mockProfile];

const mockKoten: Kot[] = [
    new Kot({
        location: 'Brussels',
        price: 450,
        surfaceSpace: 25,
        profiles: mockProfiles,
    }),
    new Kot({
        location: 'Antwerp',
        price: 600,
        surfaceSpace: 35,
        profiles: mockProfiles,
    }),
];

const mockProfilesDB: Profile[] = [mockProfile];

// Setup Mocks
beforeEach(() => {
    jest.spyOn(profileDb, 'getAllProfiles').mockReturnValue(mockProfilesDB);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: Profiles exist in database; when: getAllProfiles is called; then: all Profiles are returned;', () => {
    // Act
    const result = profileService.getAllProfiles();

    // Assert
    expect(profileDb.getAllProfiles).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProfilesDB);
});
