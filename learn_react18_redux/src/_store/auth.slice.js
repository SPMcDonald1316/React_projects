import { createAsyncThunk, createReducer, createSlice } from "@reduxjs/toolkit";
import { history, fetchWrapper } from '../_helpers';

// create slice
const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    error: null
  };
}

function createReducers() {
  return {
    logout
  };

  function logout(state) {
    state.user = null;
    localStorage.removeItem('user');
    history.navigate('/login');
  }
}

function createExtraActions() {
  const baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/users`;
  return {
    login: login()
  };

  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async ({ username, password }) => await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
    );
  }
}

function createExtraReducers() {
  var { pending, fullfilled, rejected } = extraActions.login
  const login = createReducer([], (builder) => {
    builder
      .addCase([pending], (state) => {
        state.error = null;
      })
      .addCase([fullfilled], (state, action) => {
        const user = action.payload;
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
      })
      .addCase([rejected], (state, action) => {
        state.error = action.error;
      })
  })

  return {
    ...login()
  }
}
