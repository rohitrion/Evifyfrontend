// // Create a ProtectedRoute component
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { AuthState } from '../Recoil';


// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const auth = useRecoilValue(AuthState);


//     return auth.isAuthenticated ? (
//         <Route {...rest} element={element} />
//     ) : (
//         <Navigate to="/login" replace={true} />
//     );


// };

// export default ProtectedRoute;


// Create a ProtectedRoute component
// ProtectedRoute.js
// ProtectedRoute.js
// ProtectedRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useRecoilValue } from 'recoil';
// import { AuthState } from '../Recoil';

// const ProtectedRoute = ({ element, ...rest }) => {
//   const auth = useRecoilValue(AuthState);

//   return auth.isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" replace={true} />
//   );
// };

// export default ProtectedRoute;



// ProtectedRoute.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AuthState } from '../Recoil';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const auth = useRecoilValue(AuthState);

  return auth.isAuthenticated ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;
