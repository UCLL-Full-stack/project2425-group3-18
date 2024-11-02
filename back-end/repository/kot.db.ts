import { Profile } from '../model/profile';
import { User } from '../model/user';
import { Kot } from '../model/kot';

const user1 = new User({
    userName: 'alice123',
    email: 'joe@example.com',
    password: 'securePassword123',
});

const user2 = new User({
    userName: 'bob456',
    email: 'jane@example.com',
    password: 'anotherSecurePassword456',
});

const profile1 = new Profile({
    firstName: 'joe',
    lastName: 'Johnson',
    bio: 'Graduate student at KU Leuven',
    role: 'User',
    user: user1,
    posts: [],
    koten: [],
});

const profile2 = new Profile({
    firstName: 'jane',
    lastName: 'Smith',
    bio: 'Research assistant',
    role: 'User',
    user: user2,
    posts: [],
    koten: [],
});

const sampleKot = new Kot({
    location: 'Downtown Leuven',
    price: 600,
    surfaceSpace: 25,
    profiles: [profile1],
});

const sampleKot2 = new Kot({
    location: 'Oude Markt',
    price: 550,
    surfaceSpace: 15,
    profiles: [profile2],
});

const koten: Kot[] = [sampleKot, sampleKot2];

const getAllKoten = (): Kot[] => {
    return koten;
};

export default {
    getAllKoten,
};
