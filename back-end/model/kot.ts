import { Location } from './location';
import { Profile } from './profile';
import {
    Kot as KotPrisma,
    Location as LocationPrisma,
    Profile as ProfilePrisma,
} from '@prisma/client';
export class Kot {
    private id?: number;
    private location: Location;
    private price: number;
    private surfaceSpace: number;

    constructor(kot: {
        id?: number;
        location: Location;
        price: number;
        surfaceSpace: number;
    }) {
        this.id = kot.id;
        this.location = kot.location;
        this.price = this.validatePrice(kot.price);
        this.surfaceSpace = this.validateSurfaceSpace(kot.surfaceSpace);
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

    getId(): number | undefined {
        return this.id;
    }

    getLocation(): Location {
        return this.location;
    }

    setLocation(location: Location): void {
        this.location = location;
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

    equals(kot: Kot): boolean {
        return (
            this.id === kot.getId() &&
            this.location.equals(kot.getLocation()) &&
            this.price === kot.getPrice()
        );
    }

    static from({
        id,
        location,
        price,
        surfaceSpace,
    }: KotPrisma & { location: LocationPrisma;}) {
        return new Kot({
            id,
            location: Location.from(location),
            price,
            surfaceSpace,
        });
    }
}
