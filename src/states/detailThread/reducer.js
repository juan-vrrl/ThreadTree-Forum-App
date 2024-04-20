import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.TOGGLE_UPVOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: [action.payload.userId, ...detailThread.upVotesBy],
      };
    case ActionType.TOGGLE_DOWNVOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        downVotesBy: [action.payload.userId, ...detailThread.downVotesBy],
      };
    case ActionType.TOGGLE_NEUTRALVOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ActionType.TOGGLE_UPVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [action.payload.userId, ...comment.upVotesBy],
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_DOWNVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: [action.payload.userId, ...comment.downVotesBy],
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_NEUTRALVOTE_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
          return comment;
        }),
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
