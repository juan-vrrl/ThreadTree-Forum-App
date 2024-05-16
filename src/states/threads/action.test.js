/**
 * skenario test (2 thunk function)
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when data post success
 *  - should dispatch action and call alert correctly when data post failed
 *
 * - asyncToogleUpvoteThread thunk
 *  - should dispatch action correctly when upvoting success
 *  - should dispatch action and call alert correctly when upvoting failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddThread, addThreadActionCreator, asyncToggleUpvoteThread, toggleUpvoteThreadActionCreator,
} from './action';

const fakeAddThreadsResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

// ... kode fake data

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    // delete backup data
    delete api._createThread;
  });

  // ... backup and restore

  // dummy param
  const threadData = { title: 'Thread Pertama', body: 'Ini adalah thread pertama', category: 'General' };

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeAddThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncAddThread(threadData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeAddThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncAddThread(threadData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncToggleUpvoteThread thunk', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    delete api._upVoteThread;
  });

  it('should dispatch action correctly when upvoting success', async () => {
    // arrange
    api.upVoteThread = () => Promise.resolve();

    // mock
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ authUser: { id: 'user-1' } }));

    // dummy
    const threadId = 'thread-1';

    // action
    await asyncToggleUpvoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleUpvoteThreadActionCreator({ threadId, userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when upvoting failed', async () => {
    // arrange
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ authUser: { id: 'user-1' } }));
    const threadId = 'thread-1';
    window.alert = vi.fn();

    // action
    await asyncToggleUpvoteThread(threadId)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(toggleUpvoteThreadActionCreator({ threadId, userId: 'user-1' }));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(toggleUpvoteThreadActionCreator({ threadId, userId: 'user-1' }));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
