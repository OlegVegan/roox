import React, { useState, useEffect } from 'react'

import { UserListItem } from './UserListItem'

import "./UserList.scss"
import { IUser } from '../interfaces/Users'
interface Props {
    userList: IUser[] | [],
    setSelectedUserId: (num: null | number) => void
}

export const UserList: React.FC<Props> = ({ userList, setSelectedUserId }) => {
    const [filter, setFilter] = useState('name')

    if (userList.length === 0) return <></>
    return (
        <div className="user-list">
            <h3>Список пользователей</h3>
            <span>Упорядочить</span>
            <button onClick={() => setFilter('name')} className={filter === 'name' ? 'active' : ""}>по имени</button>
            <button onClick={() => setFilter('city')} className={filter === 'city' ? 'active' : ""}>по городу</button>
            {filter === 'name' && userList.sort((a, b) => a.name.localeCompare(b.name)).map(user => <UserListItem key={user.id} user={user} setSelectedUserId={setSelectedUserId} />)}
            {filter === 'city' && userList.sort((a, b) => a.address.city.localeCompare(b.address.city)).map(user => <UserListItem key={user.id} user={user} setSelectedUserId={setSelectedUserId} />)}
        </div>
    )
}

/* .sort((a, b) => a.name - b.name) */