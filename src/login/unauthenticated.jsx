import { MessageDialog } from './messageDialog';
import React, { useState } from "react";

export function Unauthenticated(props) {
  const [userName, setUserName] = useState(props.userName);
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="your@email.com"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input
            className="form-control"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button className="btn text-light" variant='primary' onClick={() => loginUser()}>
          Login
        </button>
        <button className="btn text-light" variant='primary' onClick={() => createUser()}>
          Create
        </button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}