import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Route guards, so the auth rule for a route is a named thing you can see
 * you've forgotten rather than a ternary you have to remember to retype.
 *
 * `fallback` is what a signed-out visitor gets. Sections that have a public
 * marketing page pass that page; everything else falls back to a redirect.
 */
export const RequireAuth = ({ user, fallback = <Navigate to="/login" />, children }) =>
  user ? children : fallback;

export const RequireAdmin = ({ user, isAdmin, children }) =>
  user && isAdmin ? children : <Navigate to="/" />;
