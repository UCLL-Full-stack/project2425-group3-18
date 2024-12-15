import { Profile } from './profile';
import {
    Post as PostPrisma,
    Profile as ProfilePrisma,
} from '@prisma/client';

export class Post {
    private id?: number;
    private description: string;
    private image: string;
    private profile: Profile | undefined;

    constructor(post: {
        id?: number;
        description: string;
        image: string;
        profile: Profile | undefined;
    }) {
        this.id = post.id;
        this.description = this.validateDescription(post.description);
        this.image = this.validateImage(post.image);
        this.profile = post.profile;
    }

    private validateDescription(description: string): string {
        if (!description || description.trim() === '') {
            throw new Error('Description cannot be empty');
        }
        return description;
    }

    private validateImage(image: string): string {
        if (!image || image.trim() === '') {
            throw new Error('Image cannot be empty');
        }
        return image;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): void {
        this.description = this.validateDescription(description);
    }

    getImage(): string {
        return this.image;
    }

    setImage(image: string): void {
        this.image = this.validateImage(image);
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

    equals(post: Post): boolean {
        return (
            this.id === post.getId() &&
            this.description === post.getDescription() &&
            this.image === post.getImage() 
        );
    }

    static from({
        id,
        description,
        image,
        profile,
    }: PostPrisma & { profile: ProfilePrisma | null }) {
        return new Post({
            id,
            description,
            image,
            profile: profile ? Profile.from(profile): undefined, 
        });
    }
}
