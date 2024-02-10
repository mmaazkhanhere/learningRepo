/*This component receives an array of comment data as a prop and renders a
list of CommentItem component, each representing an individual comment in the
feed. This component facilitates the rendering of comment data in a 
structured manner */

import CommentItem from './CommentItem';

interface CommentFeedProps {
    comments?: Record<string, any>[]; /*Optional comment array */
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
    return (
        <>
            {
                /*Map over the comment data and use it as a single entity */

                comments.map((comment: Record<string, any>,) => (
                    <CommentItem key={comment.id} data={comment} />
                ))
            }
        </>
    );
};

export default CommentFeed;