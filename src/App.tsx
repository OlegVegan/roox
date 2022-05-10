import { useState, useEffect } from "react"

import { Profile } from './components/profile/Profile'
import { UserList } from './components/lists/UserList'

import { IUser } from './components/interfaces/Users'
import Axios from "axios"
import './App.scss'

type IUserList = IUser[] | []
type IUserID = null | number

export default function App() {
  const [selectedUserId, setSelectedUserId] = useState<IUserID>(null)
  const [userList, setUserList] = useState<IUserList>([])

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/users').then((users) => {
      setUserList(users.data)
    })
  }, [])

  return (
    <div className="main-container">
      {selectedUserId && <Profile userList={userList} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} />}
      {!selectedUserId && <UserList userList={userList} setSelectedUserId={setSelectedUserId} />}
    </div>
  )
}