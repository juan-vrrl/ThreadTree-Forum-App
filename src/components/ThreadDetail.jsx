import React from 'react';
import PropTypes from 'prop-types';
import { BiUpvote, BiDownvote, BiCategory } from 'react-icons/bi';
import parser from 'html-react-parser';
import { postedAt } from '../utils';
import CommentList from './CommentList';

function ThreadDetail({
  id,
  title,
  body,
  category,
  owner,
  createdAt,
  comments,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVote = (event) => {
    if (isUpVoted) {
      event.stopPropagation();
      neutralVoteThread(id);
    } else {
      event.stopPropagation();
      neutralVoteThread(id);
      upVoteThread(id);
    }
  };

  const onDownVote = (event) => {
    if (isDownVoted) {
      event.stopPropagation();
      neutralVoteThread(id);
    } else {
      event.stopPropagation();
      neutralVoteThread(id);
      downVoteThread(id);
    }
  };

  return (
    <section className="thread-detail">
      <header>
        <img src={owner.avatar} alt={owner} />
        <div className="thread-detail__user-info">
          <p className="thread-detail__user-name">{owner.name}</p>
          <p style={{ display: 'flex', alignItems: 'center' }} className="thread-detail__user-id">
            <BiCategory />
            {' : #'}
            {category}
          </p>
        </div>
      </header>
      <article>
        <p className="thread-detail__text">
          <strong>{title}</strong>
        </p>
        <div className="thread-detail__text">{parser(body)}</div>
      </article>
      <footer className="item__votes detail-footer">
        <p className="thread-detail__created-at">{postedAt(createdAt)}</p>
        <div>
          <p>
            <button type="button" aria-label="like" onClick={onUpVote}>
              {isUpVoted ? (
                <BiUpvote style={{ color: 'green' }} />
              ) : (
                <BiUpvote />
              )}
            </button>
            {' '}
            {upVotesBy.length}
          </p>
          <p>
            <button type="button" aria-label="like" onClick={onDownVote}>
              {isDownVoted ? (
                <BiDownvote style={{ color: 'red' }} />
              ) : (
                <BiDownvote />
              )}
            </button>
            {' '}
            {downVotesBy.length}
          </p>
        </div>
      </footer>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          authUser={authUser}
          upVote={upVoteComment}
          downVote={downVoteComment}
          neutralVote={neutralVoteComment}
        />
      )}
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentsShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

const detailThreadShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentsShape)).isRequired,
};

ThreadDetail.propTypes = {
  ...detailThreadShape,
  authUser: PropTypes.string.isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  neutralVoteThread: PropTypes.func.isRequired,
};

export default ThreadDetail;
