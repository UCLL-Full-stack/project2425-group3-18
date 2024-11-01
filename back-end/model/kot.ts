import { Profile } from "./profile";

export class Kot {
    private location: string;
    private price: number;
    private surfaceSpace: number;
    private profiles: Array<Profile>;

    constructor(kot: { location: string; price: number; surfaceSpace: number; profiles: Array<Profile> }) {
        this.location = kot.location;
        this.price = kot.price;
        this.surfaceSpace = kot.surfaceSpace;
        this.profiles = kot.profiles;
    }

    getLocation(): string {
        return this.location;
    }

    setLocation(location: string): void {
        if (!location) {
            throw new Error("Location cannot be empty");
        }
        this.location = location;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        if (price <= 0) {
            throw new Error("Price must be greater than zero");
        }
        this.price = price;
    }

    getSurfaceSpace(): number {
        return this.surfaceSpace;
    }

    setSurfaceSpace(surfaceSpace: number): void {
        if (surfaceSpace <= 0) {
            throw new Error("Surface space must be greater than zero");
        }
        this.surfaceSpace = surfaceSpace;
    }

    getProfiles(): Array<Profile> {
        return this.profiles;
    }

    setProfiles(profiles: Array<Profile>): void {
        this.profiles = profiles;
    }
}
