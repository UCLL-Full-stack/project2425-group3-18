import { Profile } from './profile';

export class Kot {
    private location: string;
    private price: number;
    private surfaceSpace: number;
    private profiles: Array<Profile>;

    constructor(kot: {
        location: string;
        price: number;
        surfaceSpace: number;
        profiles: Array<Profile>;
    }) {
        this.location = this.validateLocation(kot.location);
        this.price = this.validatePrice(kot.price);
        this.surfaceSpace = this.validateSurfaceSpace(kot.surfaceSpace);
        this.profiles = kot.profiles;
    }

    private validateLocation(location: string): string {
        if (!location || location.trim() === '') {
            throw new Error('Location cannot be empty');
        }
        return location;
    }

    private validatePrice(price: number): number {
        if (price <= 0) {
            throw new Error('Price must be greater than zero');
        }
        return price;
    }

    private validateSurfaceSpace(surfaceSpace: number): number {
        if (surfaceSpace <= 0) {
            throw new Error('Surface space must be greater than zero');
        }
        return surfaceSpace;
    }

    getLocation(): string {
        return this.location;
    }

    setLocation(location: string): void {
        this.location = this.validateLocation(location);
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = this.validatePrice(price);
    }

    getSurfaceSpace(): number {
        return this.surfaceSpace;
    }

    setSurfaceSpace(surfaceSpace: number): void {
        if (surfaceSpace <= 0) {
            throw new Error('Surface space must be greater than zero');
        }
        this.surfaceSpace = this.validateSurfaceSpace(surfaceSpace);
    }

    getProfiles(): Array<Profile> {
        return this.profiles;
    }

    setProfiles(profiles: Array<Profile>): void {
        this.profiles = profiles;
    }

    addProfile(profile: Profile): void {
        this.profiles.push(profile);
    }
}
