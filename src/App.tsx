import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import { Component } from 'react'
import type { ReactNode } from 'react'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'

// Error Boundary pour capturer les erreurs React
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Erreur capturée par ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#ef4444',
          maxWidth: '600px',
          margin: '4rem auto'
        }}>
          <h1>Une erreur est survenue</h1>
          <p>{this.state.error?.message || 'Erreur inconnue'}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Recharger la page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
