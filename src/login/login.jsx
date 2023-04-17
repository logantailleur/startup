import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}




// import { MessageDialog } from './messageDialog';
// import React, { useState } from "react";

// export function Login(props) {
//   const [userName, setUserName] = useState(props.userName);
//   const [password, setPassword] = useState('');
//   const [displayError, setDisplayError] = useState(null);

//   async function loginUser() {
//     loginOrCreate(`/api/auth/login`);
//   }
  
//   async function createUser() {
//     loginOrCreate(`/api/auth/create`);
//   }
  
//   async function loginOrCreate(endpoint) {
//     const response = await fetch(endpoint, {
//       method: 'post',
//       body: JSON.stringify({email: userName, password: password }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     });
//     if (response?.status === 200) {
//       localStorage.setIte('userName', userName);
//       props.onLogin(userName);
//     } else {
//       const body = await response.json();
//       setDisplayError(`⚠ Error: ${body.msg}`);
//     }
//   }

//   return (
//     <main class="container-fluid secondary text-center">
//       <div>
//         <h1>Welcome, Please Login</h1>
//         <div id="loginControls" >
//           <div class="input-group mb-3">
//             <span class="input-group-text">@</span>
//             <input 
//               class="form-control" 
//               type="text" 
//               value={userName} 
//               onChange={(e) => setUserName(e.target.value)} 
//               placeholder="your@email.com" 
//             />
//           </div>
//           <div class="input-group mb-3">
//             <span class="input-group-text">🔒</span>
//             <input 
//               class="form-control" 
//               type="password" 
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="password" 
//             />
//           </div>
//           <button className="btn text-light" variant='primary' onClick={() => loginUser()}>
//             Login
//           </button>
//           <button className="btn text-light" variant='primary' onClick={() => createUser()}>
//             Create
//           </button>
//         </div>
//       </div>
//       <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
//     </main>
//   )
// }