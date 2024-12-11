import { Comment } from './comment';
import { Post as PostPrisma, Comment as CommentPrisma } from '@prisma/client';

export class Post {
    private id?: number;
    private description: string;
    private image: string;
    private comments: Array<Comment>;

    constructor(post: {
        id?: number;
        description: string;
        image: string;
        comments: Array<Comment>;
    }) {
        this.id = post.id;
        this.description = this.validateDescription(post.description);
        this.image = this.validateImage(post.image);
        this.comments = post.comments || [];
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

    getComments(): Array<Comment> {
        return this.comments;
    }

    setComments(comments: Array<Comment>): void {
        this.comments = comments;
    }

    equals(post: Post): boolean {
        return (
            this.id === post.getId() &&
            this.description === post.getDescription() &&
            this.image === post.getImage() &&
            this.comments.length === post.getComments().length &&
            this.comments.every((comment, index) => comment.equals(post.getComments()[index]))
        );
    }
    
    static from({ id, description, image, comments}: PostPrisma & { comments: CommentPrisma[] }) {
        return new Post({
            id,
            description,
            image,
            comments: comments.map((comment) => Comment.from(comment)),
        });
    }
}
