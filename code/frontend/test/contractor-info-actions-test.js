import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { addContractor, editContractor, viewContractors } from '../src/actions/contractor-info-actions.js';
import * as TYPES from '../src/constants/action-types.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Contractor Information Actions: View', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      contractors: {
        error: false,
        data: []
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should get the contractors list on successful return', () => {
    nock('https://localhost:8443')
      .post('') // TODO
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
        // TODO
      });

    const expectedActions = []; // TODO

    return store.dispatch(/*TODO*/).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'test error message';
    nock('https://localhost:8443')
      .post('') // TODO
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
        // TODO
      });

    const expectedActions = []; // TODO

    return store.dispatch(/*TODO*/).then(() => {
      expect.fail('Call should have failed');
    }).catch((err) => {
      expect(err).to.equal(errorMessage);
    });
  });
});

describe('Contractor Information Actions: Add', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      contractors: {
        error: false,
        data: []
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should ??? on successful event', () => {
    nock('https://localhost:8443')
      .post('') // TODO
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
        // TODO
      });

    const expectedActions = []; // TODO

    return store.dispatch(/*TODO*/).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'test error message';
    nock('https://localhost:8443')
      .post('') // TODO
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
        // TODO
      });

    const expectedActions = []; // TODO

    return store.dispatch(/*TODO*/).then(() => {
      expect.fail('Call should have failed');
    }).catch((err) => {
      expect(err).to.equal(errorMessage);
    });
  });
});

describe('Contractor Information Actions: Edit', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      contractors: {
        error: false,
        data: []
      }
    });
  });

  afterEach(() => {
    store = null;
  });

  it('Should ??? on successful event', () => {
    nock('https://localhost:8443')
      .post('') // TODO
      .delay(0)
      .reply(200, {
        'error': false,
        'errorMessage': null
        // TODO
      });

    const expectedActions = []; // TODO

    return store.dispatch(/*TODO*/).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    }).catch((err) => {
      expect.fail(err);
    });
  });

  it('Should return correct error on failure', () => {
    const errorMessage = 'test error message';
    nock('https://localhost:8443')
      .post('') // TODO
      .delay(0)
      .reply(200, {
        'error': true,
        'errorMessage': errorMessage
        // TODO
      });

    const expectedActions = []; // TODO

    return store.dispatch(/*TODO*/).then(() => {
      expect.fail('Call should have failed');
    }).catch((err) => {
      expect(err).to.equal(errorMessage);
    });
  });
});
