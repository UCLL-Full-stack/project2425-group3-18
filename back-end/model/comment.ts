import { Post } from './post';

export class Comment {
    private text: string;
    private post: Post;

    constructor(comment: { text: string; post: Post }) {
        this.text = comment.text;
        this.post = comment.post;
    }

    getText(): string {
        return this.text;
    }

    setText(text: string): void {
        this.text = text;
    }

    getPost(): Post {
        return this.post;
    }
}
