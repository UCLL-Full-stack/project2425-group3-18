import { Kot } from './kot';
import { Post } from './post';
import {
    Profile as Profileprisma,
    Kot as KotPrisma,
    Post as PostPrisma,
} from '@prisma/client';

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

export class Profile {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private bio: string;
    private role: role;
    private posts: Array<Post>;
    private koten: Array<Kot>;

    constructor(profile: {
        id?: number;
        firstName: string;
        lastName: string;
        bio: string;
        role: role;
        posts: Array<Post>;
        koten: Array<Kot>;
    }) {
        this.id = profile.id;
        this.firstName = this.validateName(profile.firstName);
        this.lastName = this.validateName(profile.lastName);
        this.bio = this.validateBio(profile.bio);
        this.role = this.validateRole(profile.role);
        this.posts = profile.posts;
        this.koten = profile.koten;
    }

    private validateName(name: string): string {
        if (!name || name.trim() === '') {
            throw new Error('Name cannot be empty');
        }
        return name;
    }

    private validateBio(bio: string): string {
        return bio;
    }

    private validateRole(role: role): role {
        if (!role || role.trim() === '') {
            throw new Error('Role cannot be empty');
        }
        if (!['User', 'Admin', 'Moderator'].includes(role)) {
            throw new Error('Role needs to be either User, Admin or Moderator');
        }
        return role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = this.validateName(firstName);
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = this.validateName(lastName);
    }

    getBio(): string {
        return this.bio;
    }

    setBio(bio: string): void {
        this.bio = this.validateBio(bio);
    }

    getRole(): role {
        return this.role;
    }

    setRole(role: role): void {
        this.role = this.validateRole(role);
    }

    getPosts(): Array<Post> {
        return this.posts;
    }

    addPost(post: Post): void {
        this.posts.push(post);
    }

    getKoten(): Array<Kot> {
        return this.koten;
    }

    addKot(kot: Kot): void {
        this.koten.push(kot);
    }

    equals(profile: Profile): boolean {
        return (
            this.id === profile.getId() &&
            this.firstName === profile.getFirstName() &&
            this.lastName === profile.getLastName() &&
            this.bio === profile.getBio() &&
            this.role === profile.getRole() &&
            this.posts.length === profile.getPosts().length &&
            this.posts.every((post, index) => post.equals(profile.getPosts()[index])) &&
            this.koten.length === profile.getKoten().length &&
            this.koten.every((kot, index) => kot.equals(profile.getKoten()[index]))
        );
    }

    static from({
        id,
        firstName,
        lastName,
        bio,
        role,
        posts = [],
        koten = [],
    }: Profileprisma & { posts?: PostPrisma[]; koten?: KotPrisma[] }) {
        return new Profile({
            id,
            firstName,
            lastName,
            bio,
            role: role as role,
            posts: posts.map((post) => Post.from(post)),
            koten: koten.map((kot) => Kot.from(kot)),
        });
    }
}
