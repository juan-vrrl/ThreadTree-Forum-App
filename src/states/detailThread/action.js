import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  TOGGLE_UPVOTE_DETAIL_THREAD: 'TOGGLE_UPVOTE_DETAIL_THREAD',
  TOGGLE_DOWNVOTE_DETAIL_THREAD: 'TOGGLE_DOWNVOTE_DETAIL_THREAD',
  TOGGLE_NEUTRALVOTE_DETAIL_THREAD: 'TOGGLE_NEUTRALVOTE_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRALVOTE_COMMENT: 'TOGGLE_NEUTRALVOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function toggleUpVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function toggleNeutralVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_NEUTRALVOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_NEUTRALVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());

    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    dispatch(toggleUpVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.upVoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    dispatch(toggleDownVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.downVoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleNeutralVoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, detailThread } = getState();
    dispatch(toggleNeutralVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.neutralVoteThread(detailThread.id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleUpVoteCommentActionCreator(commentId, authUser.id));

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator(commentId, authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleDownVoteCommentActionCreator(commentId, authUser.id));

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator(commentId, authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleNeutralVoteCommentActionCreator(commentId, authUser.id));

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralVoteCommentActionCreator(commentId, authUser.id));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  toggleUpVoteDetailThreadActionCreator,
  toggleDownVoteDetailThreadActionCreator,
  toggleNeutralVoteDetailThreadActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
  addCommentActionCreator,
  asyncReceiveDetailThread,
  asyncToggleUpVoteDetailThread,
  asyncToggleDownVoteDetailThread,
  asyncToggleNeutralVoteDetailThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  asyncAddComment,
};
