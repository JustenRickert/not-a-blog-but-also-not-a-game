import { useReducer } from "react";

import { createSlice, update } from "../client/util";
import Page from "../client/page";

const slice = createSlice({
  name: "state",
  reducerMap: {
    updateLogin(state, { payload: { key, value } }) {
      return update(state, ["login", key], value);
    },
    setError(state, { payload: error }) {
      return update(state, "error", error);
    }
  }
});

export default function NewUser({}) {
  const [state, dispatch] = useReducer(slice.reducer, {
    error: false,
    login: {
      username: "",
      password: ""
    }
  });
  const handleFormUpdate = e => {
    if (state.error) dispatch(slice.actions.setError(false));
    dispatch(
      slice.actions.updateLogin({
        key: e.target.name,
        value: e.target.value
      })
    );
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    fetch("/api/login/create-new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state.login)
    }).then(res => {
      switch (res.status) {
        case 200:
        case 302:
          window.location.href = "/";
          break;
        case 400:
          dispatch(slice.actions.setError(true));
      }
    });
  };
  return (
    <Page>
      <form>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          onChange={handleFormUpdate}
          value={state.login.username}
        />
        <label htmlFor="username">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleFormUpdate}
          value={state.login.password}
        />
        <input
          onClick={handleFormSubmit}
          type="submit"
          value="Create new account"
        />
        {state.error && "Error"}
      </form>
    </Page>
  );
}
