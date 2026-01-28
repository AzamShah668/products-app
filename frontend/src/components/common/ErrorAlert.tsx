import React from 'react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss, className = '' }) => (
  <div className={`error-alert ${className}`.trim()} role="alert">
    <p>{message}</p>
    {onDismiss && (
      <button type="button" onClick={onDismiss} aria-label="Dismiss">
        <i className="fas fa-times" />
      </button>
    )}
  </div>
);

export default ErrorAlert;
