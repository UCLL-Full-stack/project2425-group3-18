import { Kot } from "./kot";
import { Post } from "./post";
import { User } from "./user";

export class Profile {

    private firstName: string;
    private lastName: string;
    private bio: string;
    private role: string;
    private user: User;
    private posts: Array<Post>;
    private koten: Array<Kot>;

    constructor( profile: {firstName: string; lastName: string; bio: string; role: string; user: User, posts: Array<Post>, koten: Array<Kot> }) {
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.bio = profile.bio;
        this.role = profile.role;
        this.user = profile.user;
        this.posts = profile.posts;
        this.koten = profile.koten;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    getBio(): string {
        return this.bio;
    }

    setBio(bio: string): void {
        this.bio = bio;
    }

    getRole(): string {
        return this.role;
    }

    setRole(role: string): void {
        this.role = role;
    }

    getUser(): User {
        return this.user;
    }

    getPosts(): Array<Post>{
        return this.posts;
    }

    getKoten(): Array<Kot> {
        return this.koten;
    }
}