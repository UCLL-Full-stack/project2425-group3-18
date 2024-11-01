import { Post } from '../../model/post';
import { Comment } from '../../model/comment';

/*
test('given:; when:; then:;', () => {

})
*/

const post = new Post({
    description: 'Mijn gezellig kot in Leuven centrum :)',
    image: 'mijnkot.jpg',
    comments: [],
});

test('given: valid values for Comment, when: Comment is created, then: Comment is created with those values', () => {
    //given
    const commentText = 'This is a stunning view!';

    //when
    const comment = new Comment({
        text: commentText,
        post: post,
    });

    //then
    expect(comment.getText()).toEqual(commentText);
    expect(comment.getPost()).toEqual(post);
});

test('given: an existing Comment, when: setting new text, then: text is updated', () => {
    //given
    const initialText = 'Amazing!';
    const updatedText = 'Absolutely breathtaking!';
    const comment = new Comment({
        text: initialText,
        post: post,
    });

    //when
    comment.setText(updatedText);

    //then
    expect(comment.getText()).toEqual(updatedText);
});

test('given: a Comment, when: retrieving post, then: associated post is returned', () => {
    //given
    const commentText = 'What a view!';
    
    //when
    const comment = new Comment({
        text: commentText,
        post: post,
    });

    //then
    expect(comment.getPost()).toEqual(post);
});

test('given: a Comment, when: setting empty text, then: Comment text is updated to empty', () => {
    //given
    const initialText = 'Beautiful scenery!';
    const comment = new Comment({
        text: initialText,
        post: post,
    });

    //when
    comment.setText('');

    //then
    expect(comment.getText()).toEqual('');
});
