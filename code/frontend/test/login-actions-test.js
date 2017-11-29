import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { loginUser, validateSession, logout } from '../src/actions/login-actions.js';
import * as TYPES from '../src/constants/action-types.js';
import { LIVE_SITE } from '../src/constants/urls.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockSetFunction = {};
mockSetFunction.set = () => expect(true).to.be.true;
mockSetFunction.remove = () => expect.fail('Wrong function was called');

const mockRemoveFunction = {};
mockRemoveFunction.remove = () => expect(true).to.be.true;
mockRemoveFunction.set = () => expect.fail('Wrong function was called');

/* ================================================
*
* LOGIN
*
* */

describe('Login user API call', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        error: false,
        token: ''
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should return correct response on successful call - normal user permissions', () => {
    nock(LIVE_SITE)
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
        'permissions': 'write',
        'token': 'user'
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
        isAdmin: false,
        token: 'user'
      }
    ];

    return store.dispatch(loginUser('user', 'user', mockSetFunction)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on successful call - admin user permissions', () => {
    nock(LIVE_SITE)
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
        'permissions': 'admin',
        'token': 'admin'
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
        isAdmin: true,
        token: 'admin'
      }
    ];

    return store.dispatch(loginUser('admin', 'admin', mockSetFunction)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on unsuccessful call - error message in body', () => {
    const errorMessage = 'test error message';

    nock(LIVE_SITE)
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
        'permissions': 'none',
        'token': ''
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

    return store.dispatch(loginUser('admin', '1234', mockRemoveFunction)).then(() => {
      expect.fail('This should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('Should return correct response on unsuccessful call - error in request', () => {
    nock(LIVE_SITE)
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
        'permissions': 'none',
        'token': ''
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

    return store.dispatch(loginUser('admin', '1234', mockRemoveFunction)).then(() => {
      expect.fail('This should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});

/* ================================================
*
* REFRESH
*
* */

describe('Refresh session API call', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        error: false,
        token: ''
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should return correct response on successful call - normal user permissions', () => {
    nock(LIVE_SITE)
      .get('/refresh')
      .query({
        username: 'user',
        token: 'user'
      })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
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
        isAdmin: false,
        token: 'user'
      }
    ];

    return store.dispatch(validateSession('user', 'user', mockSetFunction)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on successful call - admin user permissions', () => {
    nock(LIVE_SITE)
      .get('/refresh')
      .query({
        username: 'user',
        token: 'user'
      })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
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
        username: 'user',
        isAdmin: true,
        token: 'user'
      }
    ];

    return store.dispatch(validateSession('user', 'user', mockSetFunction)).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on failed call - bad request', () => {
    nock(LIVE_SITE)
      .get('/refresh')
      .query({
        username: 'user',
        token: 'user'
      })
      .delay(0)
      .reply(400, {
        'error': true,
        'errorMessage': 'Bad Request',
        'permissions': ''
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
        error: 'Bad Request - Please sign in again.'
      }
    ];

    return store.dispatch(validateSession('user', 'user', mockRemoveFunction)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});

/* ================================================
*
* LOGOUT
*
* */

describe('Logout user API call', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoggedIn: false,
        isAdmin: false,
        username: '',
        error: false,
        token: ''
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should return correct response on successful call', () => {
    nock(LIVE_SITE)
      .get('/logout')
      .query({
        username: 'user',
        token: 'user'
      })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
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
        type: TYPES.LOGOUT
      }
    ];

    return store.dispatch(logout('user', 'user')).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct response on failed call - bad request', () => {
    nock(LIVE_SITE)
      .get('/logout')
      .query({
        username: 'user',
        token: 'user'
      })
      .delay(0)
      .reply(400, {
        'error': true,
        'errorMessage': 'Bad Request',
        'permissions': ''
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
        type: TYPES.LOGOUT
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: 'Failed to remove session from backend: Bad Request'
      }
    ];

    return store.dispatch(logout('user', 'user')).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
