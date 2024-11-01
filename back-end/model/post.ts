import { Comment } from "./comment";

export class Post {
    private description: string;
    private image: string;
    private comments: Array<Comment>;

    constructor(post: { description: string; image: string; comments: Array<Comment> }) {
        this.description = post.description;
        this.image = post.image;
        this.comments = post.comments || [];
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): void {
        if (!description) {
            throw new Error("Description cannot be empty");
        }
        this.description = description;
    }

    getImage(): string {
        return this.image;
    }

    setImage(image: string): void {
        if (!image) {
            throw new Error("Image cannot be empty");
        }
        this.image = image;
    }

    getComments(): Array<Comment> {
        return this.comments;
    }

    setComments(comments: Array<Comment>): void {
        this.comments = comments;
    }
}
