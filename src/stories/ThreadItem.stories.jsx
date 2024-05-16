import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import ThreadItem from '../components/ThreadItem';

const stories = {
  title: 'ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
};

export default stories;

function TemplateStory(args) {
  return (
    <Router>
      <ThreadItem {...args} />
    </Router>
  );
}

// Mock user data
const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://via.placeholder.com/150',
};

// Mock thread data
const thread = {
  id: '1',
  title: 'Sample Thread Title',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  createdAt: '2024-05-16T12:00:00Z',
  category: 'General',
  totalComments: 10,
  upVotesBy: [],
  downVotesBy: [],
  authUser: 'users-1',
  user,
};

// Mock actions
const mockUpVote = () => action('UpVote');
const mockDownVote = () => action('DownVote');
const mockNeutralVote = () => action('NeutralVote');

const withNoVote = TemplateStory.bind({});
withNoVote.args = {
  id: thread.id,
  title: thread.title,
  body: thread.body,
  createdAt: '2024-05-16T12:00:00Z',
  category: thread.category,
  totalComments: thread.totalComments,
  upVotesBy: thread.upVotesBy,
  downVotesBy: thread.downVotesBy,
  authUser: thread.authUser,
  user: thread.user,
  upVote: { mockUpVote },
  downVote: { mockDownVote },
  neutralVote: { mockNeutralVote },
};

const withUpVote = TemplateStory.bind({});
withUpVote.args = {
  id: thread.id,
  title: thread.title,
  body: thread.body,
  createdAt: '2024-05-16T12:00:00Z',
  category: thread.category,
  totalComments: thread.totalComments,
  upVotesBy: ['users-1'],
  downVotesBy: thread.downVotesBy,
  authUser: thread.authUser,
  user: thread.user,
  upVote: { mockUpVote },
  downVote: { mockDownVote },
  neutralVote: { mockNeutralVote },
};

const withDownVote = TemplateStory.bind({});
withDownVote.args = {
  id: thread.id,
  title: thread.title,
  body: thread.body,
  createdAt: '2024-05-16T12:00:00Z',
  category: thread.category,
  totalComments: thread.totalComments,
  upVotesBy: thread.upVotesBy,
  downVotesBy: ['users-1'],
  authUser: thread.authUser,
  user: thread.user,
  upVote: { mockUpVote },
  downVote: { mockDownVote },
  neutralVote: { mockNeutralVote },
};

export { withNoVote, withUpVote, withDownVote };
