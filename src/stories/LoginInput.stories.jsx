import React from 'react';
import LoginInput from '../components/LoginInput';

const stories = {
  title: 'LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
};

export default stories;

const mockLogin = ({ email, password }) => {
  console.log('Logging in with:', email, password);
};

function Default() {
  return <LoginInput login={mockLogin} />;
}

function WithEmailAndPassword() {
  return <LoginInput login={mockLogin} />;
}

export { Default, WithEmailAndPassword };
