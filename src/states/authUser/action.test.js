/**
 * skenario test (1 thunk function)
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when login success
 *  - should dispatch action and call alert correctly when login failed
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

const fakeAuthUserResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when login success', async () => {
    // arrange
    api.login = () => Promise.resolve('fake-token');
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);
    const dispatch = vi.fn();
    const credentials = { email: 'john@example.com', password: 'password' };

    // action
    await asyncSetAuthUser(credentials)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith('fake-token');
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    const credentials = { email: 'john@example.com', password: 'password' };
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(credentials)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
