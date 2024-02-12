import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";


const PostView = () => {

    const router = useRouter(); //access the router object

    const { postId } = router.query; //get the postId from the query

    const { data: fetchedPost, isLoading } = usePost(postId as string);/*Get
    the post detail using the postId */

    if (isLoading || !fetchedPost) {
        /*If it is in loading state or the post is not fetched yet, display
        a loading spinner */
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
            <CommentFeed comments={fetchedPost?.comments} />
        </>
    );
}

export default PostView;