import { Post } from "../../model/post";
import { Comment } from "../../model/comment";

const validDescription = "This is a valid description.";
const validImage = "http://example.com/image.jpg";
const validComments: Array<Comment> = [];

test("given valid values for Post, when Post is created, then Post is created with those values", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    expect(post.getDescription()).toEqual(validDescription);
    expect(post.getImage()).toEqual(validImage);
    expect(post.getComments()).toEqual(validComments);
});

test("given a Post, when setting a new description, then description is updated", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    const newDescription = "Updated description.";
    post.setDescription(newDescription);
    expect(post.getDescription()).toEqual(newDescription);
});

test("given a Post, when setting a new image, then image is updated", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    const newImage = "http://example.com/new-image.jpg";
    post.setImage(newImage);
    expect(post.getImage()).toEqual(newImage);
});

test("given an empty description for Post, when setDescription is called, then it throws an error 'Description cannot be empty'", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    expect(() => {
        post.setDescription("");
    }).toThrow("Description cannot be empty");
});

test("given an empty image for Post, when setImage is called, then it throws an error 'Image cannot be empty'", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    expect(() => {
        post.setImage("");
    }).toThrow("Image cannot be empty");
});

test("given an empty description when using setDescription, then it throws an error 'Description cannot be empty'", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    expect(() => {
        post.setDescription("");
    }).toThrow("Description cannot be empty");
});

test("given an empty image when using setImage, then it throws an error 'Image cannot be empty'", () => {
    const post = new Post({
        description: validDescription,
        image: validImage,
        comments: validComments
    });

    expect(() => {
        post.setImage("");
    }).toThrow("Image cannot be empty");
});