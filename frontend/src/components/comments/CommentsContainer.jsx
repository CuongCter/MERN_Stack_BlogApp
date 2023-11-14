
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getCommentsData } from "../../data/comments";
import CommentForm from "./CommentForm";
import Comment from "./Comments";
import { useMutation } from "@tanstack/react-query";
import { createNewComment } from "../../services/index/comments";
import { toast } from "react-hot-toast";


const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const userState = useSelector((state) => state.user);
  const [affectedComment, setAffectedComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createNewComment({ token, desc, slug, parent, replyOnUser });
      },
      onSuccess: () => {
        toast.success(
          "Your comment is send successfully, it will be visible after the confirmation of the Admin"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {

    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {};
  // const deleteCommentHandler = (commentId) => {
  //   const updatedComments = comments.filter((comment) => {
  //     return comment._id !== commentId;
  //   });
  //   setComments(updatedComments);
  // };

  // const getRepliesHandler = (commentId) => {
  //   return comments
  //     .filter((comment) => comment.parent === commentId)
  //     .sort((a, b) => {
  //       return (
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //       );
  //     });
  // };

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHanlder={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;