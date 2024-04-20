import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const {
    id, name, email, avatar,
  } = authUser;

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name} />
      <div className="navigation-profile">
        <h4>{name}</h4>
        <p>{email}</p>
      </div>
      <nav>
        <Link className="navlink" to="/">Home</Link>
        {' | '}
        <Link className="navlink" to="/leaderboards">Leaderboards</Link>
      </nav>
      <button className="navlink" type="button" onClick={signOut}>Sign out</button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
