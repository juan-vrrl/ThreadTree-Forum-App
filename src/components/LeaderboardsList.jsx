import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardsItem, { leaderboardsShape } from './LeaderboardsItem';

function LeaderboardsList({
  leaderboards,
}) {
  return (
    <div className="list">
      {leaderboards.map((leaderboard) => (
        <LeaderboardsItem
          key={leaderboard.user.id}
          {...leaderboard}
        />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardsShape)).isRequired,
};

export default LeaderboardsList;
