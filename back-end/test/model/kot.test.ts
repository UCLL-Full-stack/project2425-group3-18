import { Kot } from '../../model/kot';
import { Profile } from '../../model/profile';
import { User } from '../../model/user';

/*
test('given:; when:; then:;', () => {

})
*/

const profile1 = new Profile({
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Student at KU Leuven',
    role: 'student',
    user: {} as User,
    posts: [],
    koten: [],
});

const profile2 = new Profile({
    firstName: 'Jane',
    lastName: 'Smith',
    bio: 'Researcher in Leuven',
    role: 'researcher',
    user: {} as User,
    posts: [],
    koten: [],
});

const profilesArray = [profile1, profile2];

test('given valid values for Kot, when Kot is created, then Kot is created with those values', () => {
    //given
    const location = 'Leuven City Center';
    const price = 500;
    const surfaceSpace = 30;

    //when
    const kot = new Kot({
        location,
        price,
        surfaceSpace,
        profiles: profilesArray,
    });

    //then
    expect(kot.getLocation()).toEqual(location);
    expect(kot.getPrice()).toEqual(price);
    expect(kot.getSurfaceSpace()).toEqual(surfaceSpace);
    expect(kot.getProfiles()).toEqual(profilesArray);
});

test('given a Kot, when setting a new location, then location is updated', () => {
    //given
    const kot = new Kot({
        location: 'Old Location',
        price: 400,
        surfaceSpace: 25,
        profiles: [],
    });

    //when
    const newLocation = 'New Leuven Center';
    kot.setLocation(newLocation);

    //then
    expect(kot.getLocation()).toEqual(newLocation);
});

test('given a Kot, when setting a new price, then price is updated', () => {
    //given
    const kot = new Kot({
        location: 'Leuven Suburbs',
        price: 300,
        surfaceSpace: 20,
        profiles: [],
    });

    //when
    const newPrice = 350;
    kot.setPrice(newPrice);

    //then
    expect(kot.getPrice()).toEqual(newPrice);
});

test('given a Kot, when setting a new surface space, then surface space is updated', () => {
    //given
    const kot = new Kot({
        location: 'Leuven Outskirts',
        price: 250,
        surfaceSpace: 15,
        profiles: [],
    });

    //when
    const newSurfaceSpace = 22;
    kot.setSurfaceSpace(newSurfaceSpace);

    //then
    expect(kot.getSurfaceSpace()).toEqual(newSurfaceSpace);
});

test('given a Kot, when setting new profiles, then profiles are updated', () => {
    //given
    const kot = new Kot({
        location: 'Quiet Neighborhood',
        price: 550,
        surfaceSpace: 35,
        profiles: [],
    });

    //when
    kot.setProfiles(profilesArray);

    //then
    expect(kot.getProfiles()).toEqual(profilesArray);
});

test("given an empty location for Kot, when setLocation is called, then it throws an error 'Location cannot be empty'", () => {
    //given
    const kot = new Kot({
        location: 'Initial Location',
        price: 400,
        surfaceSpace: 20,
        profiles: [],
    });

    //when

    //then
    expect(() => {
        kot.setLocation('');
    }).toThrow('Location cannot be empty');
});

test("given a negative price for Kot, when setPrice is called, then it throws an error 'Price must be greater than zero'", () => {
    //given
    const kot = new Kot({
        location: 'Valid Location',
        price: 400,
        surfaceSpace: 20,
        profiles: [],
    });

    //when

    //then
    expect(() => {
        kot.setPrice(-100);
    }).toThrow('Price must be greater than zero');
});

test("given zero price for Kot, when setPrice is called, then it throws an error 'Price must be greater than zero'", () => {
    //given
    const kot = new Kot({
        location: 'Valid Location',
        price: 400,
        surfaceSpace: 20,
        profiles: [],
    });

    //when
    
    //then
    expect(() => {
        kot.setPrice(0);
    }).toThrow('Price must be greater than zero');
});

test("given a negative surface space for Kot, when setSurfaceSpace is called, then it throws an error 'Surface space must be greater than zero'", () => {
    //given
    const kot = new Kot({
        location: 'Valid Location',
        price: 400,
        surfaceSpace: 20,
        profiles: [],
    });

    //when

    //then
    expect(() => {
        kot.setSurfaceSpace(-10);
    }).toThrow('Surface space must be greater than zero');
});

test("given zero surface space for Kot, when setSurfaceSpace is called, then it throws an error 'Surface space must be greater than zero'", () => {
    //given
    const kot = new Kot({
        location: 'Valid Location',
        price: 400,
        surfaceSpace: 20,
        profiles: [],
    });

    //when

    //then
    expect(() => {
        kot.setSurfaceSpace(0);
    }).toThrow('Surface space must be greater than zero');
});
