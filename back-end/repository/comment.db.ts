import { Post } from "../model/post";
import { Comment } from "../model/comment";
import exp from "constants";

const post = new Post({
    description: "This is a sample post.",
    image: "https://example.com/image.jpg",
    comments: []
});

const comments = [
    new Comment({
        text: "This is the first comment.",
        post: post
    }),
    new Comment({
        text: "This is the second comment.",
        post: post
    })
];

const getAllComments = (): Comment[] => {
    return comments;
}

export default {
    getAllComments
}