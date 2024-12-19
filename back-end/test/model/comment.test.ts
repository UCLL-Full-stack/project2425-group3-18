import { Comment } from '../../model/comment';
import { Post } from '../../model/post';
import { Profile } from '../../model/profile';

const mockPost = new Post({
    id: 1,
    description: 'A beautiful sunset view',
    image: 'sunset.jpg',
    profile: undefined,
});

enum role {
    user = 'User',
    moderator = 'Moderator',
    admin = 'Admin',
}

const mockProfile = new Profile({
    id: 1,
    username: 'test_user',
    bio: 'Nature lover',
    role: role.user,
});

describe('Comment', () => {
    test('given: valid values for Comment, when: Comment is created, then: Comment is created with those values', () => {
        // given
        const commentData = {
            text: 'Stunning view!',
            rating: 5,
            profile: mockProfile,
            post: mockPost,
        };

        // when
        const comment = new Comment(commentData);

        // then
        expect(comment.getText()).toEqual(commentData.text);
        expect(comment.getRating()).toEqual(commentData.rating);
        expect(comment.getProfile()).toEqual(mockProfile);
        expect(comment.getPost()).toEqual(mockPost);
    });

    test('given: an existing Comment, when: setting new text, then: text is updated', () => {
        // given
        const initialText = 'Amazing spot!';
        const updatedText = 'Absolutely stunning!';
        const comment = new Comment({
            text: initialText,
            rating: 4,
            profile: mockProfile,
            post: mockPost,
        });

        // when
        comment.setText(updatedText);

        // then
        expect(comment.getText()).toEqual(updatedText);
    });

    test('given: a Comment, when: setting empty text, then: an error is thrown', () => {
        // given
        const comment = new Comment({
            text: 'Wonderful place!',
            rating: 5,
            profile: mockProfile,
            post: mockPost,
        });

        // when & then
        expect(() => comment.setText('')).toThrow('Text cannot be empty');
    });

    test('given: a Comment, when: retrieving the profile, then: associated profile is returned', () => {
        // given
        const comment = new Comment({
            text: 'What a view!',
            rating: 5,
            profile: mockProfile,
            post: mockPost,
        });

        // when
        const profile = comment.getProfile();

        // then
        expect(profile).toEqual(mockProfile);
    });

    test('given: a Comment, when: retrieving the post, then: associated post is returned', () => {
        // given
        const comment = new Comment({
            text: 'This is breathtaking!',
            rating: 5,
            profile: mockProfile,
            post: mockPost,
        });

        // when
        const post = comment.getPost();

        // then
        expect(post).toEqual(mockPost);
    });

    test('given: an existing Comment, when: setting new rating, then: rating is updated', () => {
        // given
        const initialRating = 4;
        const updatedRating = 5;
        const comment = new Comment({
            text: 'Nice place!',
            rating: initialRating,
            profile: mockProfile,
            post: mockPost,
        });

        // when
        comment.setRating(updatedRating);

        // then
        expect(comment.getRating()).toEqual(updatedRating);
    });

    test('given: two Comments with same values, when: comparing them, then: equals method returns true', () => {
        // given
        const commentData = {
            text: 'Wonderful place!',
            rating: 5,
            profile: mockProfile,
            post: mockPost,
        };
        const comment1 = new Comment(commentData);
        const comment2 = new Comment(commentData);

        // when
        const isEqual = comment1.equals(comment2);

        // then
        expect(isEqual).toBe(true);
    });

    test('given: two Comments with different values, when: comparing them, then: equals method returns false', () => {
        // given
        const comment1 = new Comment({
            text: 'Amazing view!',
            rating: 5,
            profile: mockProfile,
            post: mockPost,
        });
        const comment2 = new Comment({
            text: 'Not so great.',
            rating: 3,
            profile: mockProfile,
            post: mockPost,
        });

        // when
        const isEqual = comment1.equals(comment2);

        // then
        expect(isEqual).toBe(false);
    });
});
