import { Kot } from './kot';
import { Post } from './post';
import { User } from './user';

export class Profile {
    private firstName: string;
    private lastName: string;
    private bio: string;
    private role: string;
    private user: User;
    private posts: Array<Post>;
    private koten: Array<Kot>;

    constructor(profile: {
        firstName: string;
        lastName: string;
        bio: string;
        role: string;
        user: User;
        posts: Array<Post>;
        koten: Array<Kot>;
    }) {
        this.firstName = this.validateName(profile.firstName);
        this.lastName = this.validateName(profile.lastName);
        this.bio = this.validateBio(profile.bio);
        this.role = this.validateRole(profile.role);
        this.user = profile.user;
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

    private validateRole(role: string): string {
        if (!role || role.trim() === '') {
            throw new Error('Role cannot be empty');
        }
        if (!['User', 'Admin', 'Moderator'].includes(role)) {
            throw new Error('Role needs to be either User, Admin or Moderator');
        }
        return role;
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

    getRole(): string {
        return this.role;
    }

    setRole(role: string): void {
        this.role = this.validateRole(role);
    }

    getUser(): User {
        return this.user;
    }

    setUser(newUser: User): void {
        this.user = newUser;
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
}
