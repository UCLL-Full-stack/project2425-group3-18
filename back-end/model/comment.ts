import { Post } from './post';
import { Profile } from './profile';
import {
    Comment as CommentPrisma,
    Post as PostPrisma,
    Profile as ProfilePrisma,
} from '@prisma/client';

export class Comment {
    private id?: number;
    private text: string;
    private post: Post;
    private profile: Profile;

    constructor(comment: { id?: number; text: string; post: Post; profile: Profile }) {
        this.id = comment.id;
        this.text = this.validateText(comment.text);
        this.post = comment.post;
        this.profile = comment.profile;
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

    getPost(): Post {
        return this.post;
    }

    getProfile(): Profile {
        return this.profile;
    }

    equals(comment: Comment): boolean {
        return (
            this.id === comment.getId() &&
            this.text === comment.getText() &&
            this.post.equals(comment.post)
        );
    }

    static from({
        id,
        text,
        post,
        profile,
    }: CommentPrisma & { post: PostPrisma } & { profile: ProfilePrisma }): Comment {
        return new Comment({
            id,
            text,
            post: Post.from(post),
            profile: Profile.from(profile),
        });
    }
}
