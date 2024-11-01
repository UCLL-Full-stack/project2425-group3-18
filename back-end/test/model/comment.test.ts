import { Post } from "../../model/post";
import { Comment } from "../../model/comment";


const post = new Post({
    description: "Mijn gezellig kot in Leuven centrum :)",
    image: "mijnkot.jpg",
    comments: []
});

test("given: valid values for Comment, when: Comment is created, then: Comment is created with those values", () => {

    const commentText = "This is a stunning view!";
    
    const comment = new Comment({
        text: commentText,
        post: post
    });

    expect(comment.getText()).toEqual(commentText);
    expect(comment.getPost()).toEqual(post);
});

test("given: an existing Comment, when: setting new text, then: text is updated", () => {
    
    const initialText = "Amazing!";
    const updatedText = "Absolutely breathtaking!";
    const comment = new Comment({
        text: initialText,
        post: post
    });

    comment.setText(updatedText);

    expect(comment.getText()).toEqual(updatedText);
});

test("given: a Comment, when: retrieving post, then: associated post is returned", () => {
    
    const commentText = "What a view!";
    const comment = new Comment({
        text: commentText,
        post: post
    });

    expect(comment.getPost()).toEqual(post);
});

test("given: a Comment, when: setting empty text, then: Comment text is updated to empty", () => {
    
    const initialText = "Beautiful scenery!";
    const comment = new Comment({
        text: initialText,
        post: post
    });

    comment.setText("");

    expect(comment.getText()).toEqual("");
});

