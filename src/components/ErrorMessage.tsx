import '../styles/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Une erreur est survenue</h2>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          🔄 Réessayer
        </button>
      )}
    </div>
  );
}

