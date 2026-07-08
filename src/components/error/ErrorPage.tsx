interface ErrorPageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export function ErrorPage({
  title = "Page not found",
  message = "This page doesn't exist.",
  onRetry,
  fullPage = true,
}: ErrorPageProps) {
  return (
    <div className={fullPage ? "min-h-screen flex items-center justify-center" : "py-12 flex items-center justify-center"}>
      <div className="text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="mt-4">Try again</button>
        )}
      </div>
    </div>
  );
}