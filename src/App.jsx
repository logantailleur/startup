import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { AuthState } from './login/authState';

import { NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Quote } from './quote/quote';
import { Results } from './results/results';
import { Votes } from './votes/votes';
import { Vote } from './vote/vote';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    setAuthState(AuthState.Unauthenticated);
  }, [userName]);

  return (
    <body className="banner text-light">
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <div className='navbar-brand'>
            Best Chicken in Provo<sup>&reg;</sup>
          </div>

          <menu className="navbar-nav">
            <li className='nav-item'>
              <NavLink className='nav-link' to=''>
                Login
              </NavLink>
            </li>
            {authState === AuthState.Authenticated && (
              <li className="nav-item">
                <NavLink className='nav-link' to='vote'>
                  Vote
                </NavLink>
              </li>
            )}
            {authState === AuthState.Authenticated && (
              <li class="nav-item">
                <NavLink className='nav-link' to='results'>
                  Results
                </NavLink>
              </li>
            )}
            {authState === AuthState.Authenticated && (
              <li class="nav-item">
                <NavLink className='nav-link' to='votes'>
                  User Votes
                </NavLink>
              </li>
            )}
            {authState === AuthState.Authenticated && (
              <li class="nav-item">
                <NavLink className='nav-link' to='quote'>
                  Quote
                </NavLink>
              </li>
            )}
          </menu>
        </nav>
      </header>

      <Routes>
        <Route
          path='/'
          element={
            <Login
              userName={userName}
              authState={authState}
              onAuthChange={(userName, authState) => {
                setAuthState(authState);
                setUserName(userName);
              }}
            />
          }
        />
        <Route path='/quote' element={<Quote />} />
        <Route path='/results' element={<Results />} />
        <Route path='/vote' element={<Vote userName={userName} />} />
        <Route path='/votes' element={<Votes />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className="banner text-dark text-muted">
        <div className="container-fluid">
          <span className="text-reset">Logan Tailleur</span>
          <a className="text-reset" href="https://github.com/logantailleur/startup">GitHub</a>
        </div>
      </footer>
    </body>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
