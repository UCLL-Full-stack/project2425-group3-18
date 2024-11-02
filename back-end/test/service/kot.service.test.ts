import { Kot } from "../../model/kot";
import { Post } from "../../model/post";
import { Profile } from "../../model/profile";
import { User } from "../../model/user";
import kotDb from "../../repository/kot.db";
import kotService from "../../service/kot.service";

// Mock Data
const mockUser = new User({
    userName: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123'
});

const mockPosts: Post[] = [
    new Post({
        description: 'Sample post 1',
        image: 'sample-image1.jpg',
        comments: []
    }),
    new Post({
        description: 'Sample post 2',
        image: 'sample-image2.jpg',
        comments: []
    })
];

const mockProfile = new Profile({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'This is a bio.',
    role: 'tenant',
    user: mockUser,
    posts: mockPosts,
    koten: []
});

mockUser.setProfile(mockProfile);

const mockProfiles: Profile[] = [mockProfile];

const mockKoten: Kot[] = [
    new Kot({
        location: 'Brussels',
        price: 450,
        surfaceSpace: 25,
        profiles: mockProfiles
    }),
    new Kot({
        location: 'Antwerp',
        price: 600,
        surfaceSpace: 35,
        profiles: mockProfiles
    })
];

// Setup Mocks
beforeEach(() => {
    jest.spyOn(kotDb, 'getAllKoten').mockReturnValue(mockKoten);
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: Koten exist in database; when: getAllKoten is called; then: all Koten are returned;', () => {
    // Act
    const result = kotService.getAllKoten();

    // Assert
    expect(kotDb.getAllKoten).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockKoten);
    expect(result[0].getLocation()).toBe('Brussels');
    expect(result[0].getPrice()).toBe(450);
    expect(result[0].getSurfaceSpace()).toBe(25);
    expect(result[0].getProfiles()[0].getFirstName()).toBe('John');
});