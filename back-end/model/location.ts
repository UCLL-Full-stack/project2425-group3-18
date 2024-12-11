import { Location as LocationPrisma} from '@prisma/client';

export class Location {
    private id?: number;
    private city: string;
    private street: string;
    private housenumber: number;

    constructor(location: {
        id?: number;
        city: string;
        street: string;
        housenumber: number;
    }) {
        this.id = location.id;
        this.city = this.validateCity(location.city);
        this.street = this.validateStreet(location.street);
        this.housenumber = location.housenumber;
    }

    private validateCity(city: string): string {
        if (!city || city.trim() === '') {
            throw new Error('City cannot be empty');
        }
        return city;
    }

    private validateStreet(street: string): string {
        if (!street || street.trim() === '') {
            throw new Error('Street cannot be empty');
        }
        return street;
    }

    getId(): number | undefined {
        return this.id;
    }

    getCity(): string {
        return this.city;
    }

    setCity(city: string): void {
        this.city = this.validateCity(city);
    }

    getStreet(): string {
        return this.street;
    }

    setStreet(street: string): void {
        this.street = this.validateStreet(street);
    }

    getHousenumber(): number {
        return this.housenumber;
    }

    setHousenumber(housenumber: number): void {
        this.housenumber = housenumber;
    }

    equals(location: Location): boolean {
        return (
            this.id === location.getId() &&
            this.city === location.getCity() &&
            this.street === location.getStreet() &&
            this.housenumber === location.getHousenumber()
        );
    }

    static from({ id, city, street, housenumber}: LocationPrisma) {
        return new Location({
            id,
            city,
            street,
            housenumber,
        });
    }
}
