import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import {
  asyncReceiveDetailThread,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleNeutralVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  asyncAddComment,
} from '../states/detailThread/action';

function DetailPage() {
  const { threadId } = useParams();
  const detailThread = useSelector((state) => state.detailThread);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(threadId));
  }, [threadId, dispatch]);

  const onUpVoteThread = () => {
    dispatch(asyncToggleUpVoteDetailThread(threadId));
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteDetailThread(threadId));
  };

  const onNeutralVoteThread = () => {
    dispatch(asyncToggleNeutralVoteDetailThread(threadId));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(threadId, commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(threadId, commentId));
  };

  const onNeutralVoteComment = (commentId) => {
    dispatch(asyncToggleNeutralVoteComment(threadId, commentId));
  };

  const onComment = (content) => {
    dispatch(asyncAddComment(threadId, content));
  };

  if (!detailThread) {
    return null;
  }

  return (
    <section className="detail-page">
      <ThreadDetail
        {...detailThread}
        authUser={authUser.id}
        upVoteThread={onUpVoteThread}
        downVoteThread={onDownVoteThread}
        neutralVoteThread={onNeutralVoteThread}
        upVoteComment={onUpVoteComment}
        downVoteComment={onDownVoteComment}
        neutralVoteComment={onNeutralVoteComment}
      />
      <CommentInput onComment={onComment} />
    </section>
  );
}

export default DetailPage;
