import React from 'react';

/**
 * Shown when a fetch fails. Pairs with LoadingIndicator: without this, a
 * failed read left the list empty and pages rendered their "nothing found"
 * copy instead — so a permission error or an offline client looked exactly
 * like a genuinely empty collection.
 */
const ErrorState = ({ message = "We couldn't load this right now.", onRetry }) => (
  <div className="error-state" role="alert">
    <p>{message}</p>
    {onRetry && (
      <button type="button" className="error-state-retry" onClick={onRetry}>
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
