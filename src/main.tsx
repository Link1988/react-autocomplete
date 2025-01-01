import React from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

type FallbackProps = {
  error: Error;
}

function fallback({ error }: FallbackProps) {
  return (
    <div role="alert">
      <p>⚠️Something went wrong</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallbackRender={fallback}>
        <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
