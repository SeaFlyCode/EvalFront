import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
