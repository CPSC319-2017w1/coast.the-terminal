import {expect} from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions';
import * as TYPES from '../src/constants/action-types.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Successful', () => {
  it('Should pass correct admin and username', () => {
    const loginResponse = actions.loginSuccessful('user', true);
    expect(loginResponse).to.have.property('username');
    expect(loginResponse).to.have.property('isAdmin');
    expect(loginResponse).to.have.property('type');
    expect(loginResponse.isAdmin).to.be.true;
    expect(loginResponse.username).to.equal('user');
    expect(loginResponse.type).to.equal(TYPES.LOGIN);
  });
});