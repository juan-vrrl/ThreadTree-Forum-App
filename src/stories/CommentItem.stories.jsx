import React from 'react';
import { action } from '@storybook/addon-actions';
import CommentItem from '../components/CommentItem';

const stories = {
  title: 'CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
};

export default stories;

function TemplateStory(args) {
  return (
    <CommentItem {...args} />
  );
}

// Mock owner data
const owner = {
  id: '1',
  name: 'Jane Doe',
  avatar: 'https://via.placeholder.com/150',
};

// Mock comment data
const comment = {
  id: '1',
  content: 'This is a sample comment.',
  createdAt: '2024-05-16T12:00:00Z',
  upVotesBy: [],
  downVotesBy: [],
  owner,
};

// Mock actions
const mockUpVote = action('UpVote');
const mockDownVote = action('DownVote');
const mockNeutralVote = action('NeutralVote');

const withNoVote = TemplateStory.bind({});
withNoVote.args = {
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  upVotesBy: comment.upVotesBy,
  downVotesBy: comment.downVotesBy,
  owner: comment.owner,
  authUser: 'users-1',
  upVote: mockUpVote,
  downVote: mockDownVote,
  neutralVote: mockNeutralVote,
};

const withUpVote = TemplateStory.bind({});
withUpVote.args = {
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  upVotesBy: ['users-1'],
  downVotesBy: comment.downVotesBy,
  owner: comment.owner,
  authUser: 'users-1',
  upVote: mockUpVote,
  downVote: mockDownVote,
  neutralVote: mockNeutralVote,
};

const withDownVote = TemplateStory.bind({});
withDownVote.args = {
  id: comment.id,
  content: comment.content,
  createdAt: comment.createdAt,
  upVotesBy: comment.upVotesBy,
  downVotesBy: ['users-1'],
  owner: comment.owner,
  authUser: 'users-1',
  upVote: mockUpVote,
  downVote: mockDownVote,
  neutralVote: mockNeutralVote,
};

export { withNoVote, withUpVote, withDownVote };
