import { Post } from './post';

export class Comment {
    private text: string;
    private post: Post;

    constructor(comment: { text: string; post: Post }) {
        this.text = this.validateText(comment.text);
        this.post = comment.post;
    }

    private validateText(text: string): string {
        if (!text || text.trim() === '') {
            throw new Error('Text cannot be empty');
        }
        return text;
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
}
