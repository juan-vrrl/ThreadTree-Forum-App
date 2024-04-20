import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote, BiDownvote,
} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  user,
  category,
  totalComments,
  authUser,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralVote,
}) {
  const navigate = useNavigate();
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

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/thread/${id}`);
    }
  };

  const truncatedBody = body.length > 200 ? `${body.substring(0, 200)}...` : body;

  return (
    <div
      role="button"
      tabIndex={0}
      className="item"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <div className="item__user-photo">
        <img src={user.avatar} alt={user} />
      </div>
      <div className="item__detail">
        <header>
          <div className="item__user-info">
            <p className="item__user-name">{user.name}</p>
            <p className="item__user-id">{user.email}</p>
            <p>
              Category :
              {' #'}
              {category}
            </p>
          </div>
          <p className="item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="item__text">
            <strong>{title}</strong>
          </p>
          <div className="item__text">{parser(truncatedBody)}</div>
        </article>
        <div className="item__votes">
          Total Comment :
          {' '}
          {totalComments}
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
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export { threadItemShape };

export default ThreadItem;
