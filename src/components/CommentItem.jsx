import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote, BiDownvote,
} from 'react-icons/bi';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  owner,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVote = (event) => {
    if (isUpVoted) {
      event.stopPropagation();
      neutralVote(id);
    } else {
      event.stopPropagation();
      neutralVote(id);
      upVote(id);
    }
  };

  const onDownVote = (event) => {
    if (isDownVoted) {
      event.stopPropagation();
      neutralVote(id);
    } else {
      event.stopPropagation();
      neutralVote(id);
      downVote(id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="item"
    >
      <div className="item__user-photo">
        <img src={owner.avatar} alt={owner} />
      </div>
      <div className="item__detail">
        <header>
          <div className="item__user-info">
            <p className="item__user-name">{owner.name}</p>
          </div>
          <p className="item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <div className="item__text">{parser(content)}</div>
        </article>
        <footer className="item__votes">
          <div className="comment-vote">
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
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
};

CommentItem.propTypes = {
  ...commentShape,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export { commentShape };

export default CommentItem;
