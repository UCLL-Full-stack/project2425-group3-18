import {
    Comment as CommentPrisma,
} from '@prisma/client';

export class Comment {
    private id?: number;
    private text: string;

    constructor(comment: { id?: number; text: string;}) {
        this.id = comment.id;
        this.text = this.validateText(comment.text);
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

    equals(comment: Comment): boolean {
        return (
            this.id === comment.getId() &&
            this.text === comment.getText() 
        );
    }

    static from({
        id,
        text,
    }: CommentPrisma) {
        return new Comment({
            id,
            text,
        });
    }
}
