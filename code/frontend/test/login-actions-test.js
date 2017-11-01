import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { loginUser } from '../src/actions/login-actions.js';
import * as TYPES from '../src/constants/action-types.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login user API call', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        error: false
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should return correct response on successful call - normal user permissions', () => {
    nock('https://localhost:8443')
      .get('/login')
      .query({
        username: 'user',
        password: 'user'
      })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
        'loginSuccessful': true,
        'username': 'user',
        'permissions': 'write'
      });

    const expectedActions = [
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: true
      },
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: false
      },
      {
        type: TYPES.LOGIN,
        username: 'user',
        isAdmin: false
      }
    ];

    return store.dispatch(loginUser('user', 'user')).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on successful call - admin user permissions', () => {
    nock('https://localhost:8443')
      .get('/login')
      .query({
        username: 'admin',
        password: 'admin'
      })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
        'loginSuccessful': true,
        'username': 'admin',
        'permissions': 'admin'
      });

    const expectedActions = [
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: true
      },
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: false
      },
      {
        type: TYPES.LOGIN,
        username: 'admin',
        isAdmin: true
      }
    ];

    return store.dispatch(loginUser('admin', 'admin')).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on unsuccessful call - error message in body', () => {
    const errorMessage = 'test error message';

    nock('https://localhost:8443')
      .get('/login')
      .query({
        username: 'admin',
        password: '1234'
      })
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage,
        'loginSuccessful': false,
        'username': '',
        'permissions': 'none'
      });

    const expectedActions = [
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: true
      },
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: false
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: errorMessage
      }
    ];

    return store.dispatch(loginUser('admin', '1234')).then(() => {
      expect.fail('This should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('Should return correct response on unsuccessful call - error in request', () => {
    nock('https://localhost:8443')
      .get('/login')
      .query({
        username: 'admin',
        password: '1234'
      })
      .delay(0)
      .reply(404, {
        'error': true,
        'errorMessage': 'test error message',
        'loginSuccessful': false,
        'username': '',
        'permissions': 'none'
      });

    const expectedActions = [
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: true
      },
      {
        type: TYPES.TOGGLE_LOADING,
        isLoading: false
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: 'Not Found'
      }
    ];

    return store.dispatch(loginUser('admin', '1234')).then(() => {
      expect.fail('This should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
