import {
    Comment as CommentPrisma,
    Profile as ProfilePrisma,
    Post as PostPrisma,
} from '@prisma/client';
import { Profile } from './profile';
import { Post } from './post';

export class Comment {
    private id?: number;
    private text: string;
    private profile: Profile;
    private post: Post;

    constructor(comment: { id?: number; text: string; profile: Profile; post: Post }) {
        this.id = comment.id;
        this.text = this.validateText(comment.text);
        this.profile = comment.profile;
        this.post = comment.post;
    }

    private validateText(text: string): string {
        if (!text || text.trim() === '') {
            throw new Error('Text cannot be empty');
        }
        return text;
    }

    getId(): number | undefined {
        return this.id;
    }

    getText(): string {
        return this.text;
    }

    setText(text: string): void {
        this.text = this.validateText(text);
    }

    getProfile(): Profile {
        return this.profile;
    }

    setProfile(profile: Profile): void {
        this.profile = profile;
    }

    getPost(): Post {
        return this.post;
    }

    setPost(post: Post): void {
        this.post = post;
    }

    equals(comment: Comment): boolean {
        return this.id === comment.getId() && this.text === comment.getText();
    }

    static from({
        id,
        text,
        profile,
        post,
    }: CommentPrisma & { profile: ProfilePrisma; post: PostPrisma & { profile: ProfilePrisma | null } }) {
        return new Comment({
            id,
            text,
            profile: Profile.from(profile), 
            post: Post.from(post),
        });
    }
}
