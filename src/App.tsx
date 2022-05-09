// React
import { useState, useEffect } from "react"

// Components
import Profile from './components/profile/Profile'
import UserList from './components/lists/UserList'

// Style
import './App.scss'

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="main-container">
      {selectedUser && <Profile />}
      {!selectedUser && <UserList />}
    </div>
  )
}