import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as TYPES from '../src/constants/action-types.js';
import { LIVE_SITE } from '../src/constants/urls.js';
import { viewTableRows } from '../src/actions/view-tables-actions';
import { addNewRow } from '../src/actions/add-tables-actions';
import { editRow } from '../src/actions/edit-tables-actions';
import { deleteRow } from '../src/actions/delete-tables-actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function successfulCallback() {
  expect(true).to.be.true;
}

function failedCallback() {
  expect.fail('Expected callback to fail');
}

function getInitialState() {
  return {
    skills: {
      data: [],
      error: false
    },
    paygrades: {
      data: [],
      error: false
    },
    hrroles: {
      data: [],
      error: false
    },
    hiringmanagers: {
      data: [],
      error: false
    },
    fxrates: {
      data: [],
      error: false
    },
    users: {
      data: [],
      error: false
    }
  };
}

const data = [{
  username: 'user',
  password: 'user',
  permissions: 'admin'
}];

/* ================================================
*
* VIEW
*
* */

describe('Table Actions: View', () => {
  let store;

  beforeEach(() => {
    store = mockStore(getInitialState());
  });

  afterEach(() => {
    store = null;
  });

  it('Should get the users list on successful return', () => {
    nock(LIVE_SITE)
      .get('/users/view')
      .query({ token: 'user' })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
        'data': data
      });

    const expectedActions = [
      {
        type: TYPES.VIEW_TABLES,
        data,
        tableName: 'users'
      }
    ];

    return store.dispatch(viewTableRows('users', 'user')).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'Bad Request';

    nock(LIVE_SITE)
      .get('/users/view')
      .query({ token: 'user' })
      .delay(0)
      .reply(400, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [{
      type: TYPES.VIEW_TABLES_FAILED,
      error: errorMessage,
      tableName: 'users'
    }];

    return store.dispatch(viewTableRows('users', 'user')).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('Should return correct error on failure - user session time out', () => {
    const errorMessage = 'User is not logged in';

    nock(LIVE_SITE)
      .get('/users/view')
      .query({ token: 'user' })
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [
      {
        type: TYPES.VIEW_TABLES_FAILED,
        error: errorMessage,
        tableName: 'users'
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: 'Login session has timed out. Please sign in again.'
      }
    ];

    return store.dispatch(viewTableRows('users', 'user')).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});


/* ================================================
*
* ADD
*
* */

describe('Table Actions: Add', () => {
  let store;
  const req = { password: 'new', token: 'user' };

  beforeEach(() => {
    store = mockStore(getInitialState());
    nock(LIVE_SITE)
      .get('/users/view')
      .query({ token: 'user' })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
        'data': data
      });
  });

  afterEach(() => {
    store = null;
  });

  it('Should receive correct response on successful return', () => {
    nock(LIVE_SITE)
      .post('/users/add')
      .query(req)
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
      });

    return store.dispatch(addNewRow('users', req, successfulCallback)).then(() => {
      expect(store.getActions()).to.deep.equal([]);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'Bad Request';

    nock(LIVE_SITE)
      .post('/users/add')
      .query(req)
      .delay(0)
      .reply(400, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [{
      type: TYPES.ADD_NEW_ROW_FAILED,
      error: errorMessage,
      tableName: 'users'
    }];

    return store.dispatch(addNewRow('users', req, failedCallback)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('Should return correct error on failure - user session time out', () => {
    const errorMessage = 'User is not logged in';

    nock(LIVE_SITE)
      .post('/users/add')
      .query(req)
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [
      {
        type: TYPES.ADD_NEW_ROW_FAILED,
        error: errorMessage,
        tableName: 'users'
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: 'Login session has timed out. Please sign in again.'
      }
    ];

    return store.dispatch(addNewRow('users', req, failedCallback)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});

/* ================================================
*
* EDIT
*
* */

describe('Table Actions: Edit', () => {
  let store;
  const req = { password: 'new', token: 'user' };

  beforeEach(() => {
    store = mockStore(getInitialState());
    nock(LIVE_SITE)
      .get('/users/view')
      .query({ token: 'user' })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
        'data': data
      });
  });

  afterEach(() => {
    store = null;
  });

  it('Should receive correct response on successful return', () => {
    nock(LIVE_SITE)
      .post('/users/edit')
      .query(req)
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
      });

    return store.dispatch(editRow('users', req, successfulCallback)).then(() => {
      expect(store.getActions()).to.deep.equal([]);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'Bad Request';

    nock(LIVE_SITE)
      .post('/users/edit')
      .query(req)
      .delay(0)
      .reply(400, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [{
      type: TYPES.EDIT_ROW_FAILED,
      error: errorMessage,
      tableName: 'users'
    }];

    return store.dispatch(editRow('users', req, failedCallback)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('Should return correct error on failure - user session time out', () => {
    const errorMessage = 'User is not logged in';

    nock(LIVE_SITE)
      .post('/users/edit')
      .query(req)
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [
      {
        type: TYPES.EDIT_ROW_FAILED,
        error: errorMessage,
        tableName: 'users'
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: 'Login session has timed out. Please sign in again.'
      }
    ];

    return store.dispatch(editRow('users', req, failedCallback)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});

/* ================================================
*
* DELETE
*
* */

describe('Table Actions: Delete', () => {
  let store;
  const req = { username: 'user1', usertodelete: 'user2', token: 'user' };

  beforeEach(() => {
    store = mockStore(getInitialState());
    nock(LIVE_SITE)
      .get('/users/view')
      .query({ token: 'user' })
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null,
        'data': data
      });
  });

  afterEach(() => {
    store = null;
  });

  it('Should receive correct response on successful return', () => {
    nock(LIVE_SITE)
      .post('/users/delete')
      .query(req)
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
      });

    return store.dispatch(deleteRow('users', req, successfulCallback)).then(() => {
      expect(store.getActions()).to.deep.equal([]);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'Bad Request';

    nock(LIVE_SITE)
      .post('/users/delete')
      .query(req)
      .delay(0)
      .reply(400, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [{
      type: TYPES.DELETE_ROW_FAILED,
      error: errorMessage,
      tableName: 'users'
    }];

    return store.dispatch(deleteRow('users', req, failedCallback)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('Should return correct error on failure - user session time out', () => {
    const errorMessage = 'User is not logged in';

    nock(LIVE_SITE)
      .post('/users/delete')
      .query(req)
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
      });

    const expectedActions = [
      {
        type: TYPES.DELETE_ROW_FAILED,
        error: errorMessage,
        tableName: 'users'
      },
      {
        type: TYPES.LOGIN_FAILED,
        error: 'Login session has timed out. Please sign in again.'
      }
    ];

    return store.dispatch(deleteRow('users', req, failedCallback)).then(() => {
      expect.fail('Call should have failed');
    }).catch(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });
});
