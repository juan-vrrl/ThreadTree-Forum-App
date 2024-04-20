import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardsItem({
  user, score,
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="item"
    >
      <div className="item__user-photo">
        <img src={user.avatar} alt={user} />
      </div>
      <div className="item__detail">
        <header>
          <div className="item__user-info">
            <p className="item__user-name">{user.name}</p>
            <p className="item__user-id">{user.email}</p>
          </div>
        </header>
        <article>
          <p className="item__text">
            Score :
            {' '}
            {score}
          </p>
          <div className="item__text">{}</div>
        </article>
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

const leaderboardsShape = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardsItem.propTypes = {
  ...leaderboardsShape,
};

export { leaderboardsShape };

export default LeaderboardsItem;
