import { Link } from "react-router-dom"

interface EmptyStateProps {
  title: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && (
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">{message}</p>
      )}
      {actionLabel && actionHref && (
        <Link to={actionHref} className="mt-4">
          <button>{actionLabel}</button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <button onClick={onAction} className="mt-4">
          {actionLabel}
        </button>
      )}
    </div>
  );
}