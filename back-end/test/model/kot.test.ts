import { Kot } from "../../model/kot";
import { Profile } from "../../model/profile";
import { User } from "../../model/user";

const profile1 = new Profile({
    firstName: "John",
    lastName: "Doe",
    bio: "Student at KU Leuven",
    role: "student",
    user: {} as User,
    posts: [],
    koten: []
});

const profile2 = new Profile({
    firstName: "Jane",
    lastName: "Smith",
    bio: "Researcher in Leuven",
    role: "researcher",
    user: {} as User,
    posts: [],
    koten: []
});

const profilesArray = [profile1, profile2];


test("given: valid values for Kot, when: Kot is created, then: Kot is created with those values", () => {
    
    const location = "Leuven City Center";
    const price = 500;
    const surfaceSpace = 30;
    
    const kot = new Kot({
        location,
        price,
        surfaceSpace,
        profiles: profilesArray
    });

    expect(kot.getLocation()).toEqual(location);
    expect(kot.getPrice()).toEqual(price);
    expect(kot.getSurfaceSpace()).toEqual(surfaceSpace);
    expect(kot.getProfiles()).toEqual(profilesArray);
});

test("given: a Kot, when: setting a new location, then: location is updated", () => {
    
    const kot = new Kot({
        location: "Old Location",
        price: 400,
        surfaceSpace: 25,
        profiles: []
    });

    const newLocation = "New Leuven Center";

    kot.setLocation(newLocation);

    expect(kot.getLocation()).toEqual(newLocation);
});

test("given: a Kot, when: setting a new price, then: price is updated", () => {

    const kot = new Kot({
        location: "Leuven Suburbs",
        price: 300,
        surfaceSpace: 20,
        profiles: []
    });

    const newPrice = 350;

    kot.setPrice(newPrice);

    expect(kot.getPrice()).toEqual(newPrice);
});

test("given: a Kot, when: setting a new surface space, then: surface space is updated", () => {
    
    const kot = new Kot({
        location: "Leuven Outskirts",
        price: 250,
        surfaceSpace: 15,
        profiles: []
    });

    const newSurfaceSpace = 22;

    kot.setSurfaceSpace(newSurfaceSpace);

    expect(kot.getSurfaceSpace()).toEqual(newSurfaceSpace);
});

test("given: a Kot, when: setting new profiles, then: profiles are updated", () => {
    
    const kot = new Kot({
        location: "Quiet Neighborhood",
        price: 550,
        surfaceSpace: 35,
        profiles: []
    });

    kot.setProfiles(profilesArray);

    expect(kot.getProfiles()).toEqual(profilesArray);
});

test("given: an empty location for Kot, when: Kot is created, then: location is empty", () => {
    
    const location = "";
    const price = 400;
    const surfaceSpace = 20;
    
    const kot = new Kot({
        location,
        price,
        surfaceSpace,
        profiles: profilesArray
    });

    expect(kot.getLocation()).toEqual("");
});

test("given: a Kot, when: setting a negative price, then: Kot price should accept it (if no validation)", () => {
    
    const kot = new Kot({
        location: "Leuven",
        price: 500,
        surfaceSpace: 25,
        profiles: profilesArray
    });

    const negativePrice = -100;

    kot.setPrice(negativePrice);

    expect(kot.getPrice()).toEqual(negativePrice);
});

test("given: a Kot, when: setting a negative surface space, then: Kot surface space should accept it (if no validation)", () => {

    const kot = new Kot({
        location: "Leuven",
        price: 400,
        surfaceSpace: 25,
        profiles: profilesArray
    });

    const negativeSurfaceSpace = -10;

    kot.setSurfaceSpace(negativeSurfaceSpace);

    expect(kot.getSurfaceSpace()).toEqual(negativeSurfaceSpace);
});