import { Comment } from './comment';

export class Post {
    private description: string;
    private image: string;
    private comments: Array<Comment>;

    constructor(post: { description: string; image: string; comments: Array<Comment> }) {
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
}
