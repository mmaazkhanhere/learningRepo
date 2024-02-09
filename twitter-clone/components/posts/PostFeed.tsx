/*A react functional component that is responsible for displaying a feed of
posts. */

import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {

    const { data: posts = [] } = usePosts(userId); /*calls the custom hook
    and destructure all the list of post*/

    return (
        <>
            {/*Display the posts */}
            {
                posts.map((post: Record<string, any>,) => (
                    <PostItem
                        userId={userId}
                        key={post.id}
                        data={post}
                    />
                ))
            }
        </>
    );
};

export default PostFeed;