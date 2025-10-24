import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
