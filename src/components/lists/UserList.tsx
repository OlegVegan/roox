import React from 'react'

import { UserListItem } from './UserListItem'
import { LoadingTag } from "../icons/Icons"

import "./UserList.scss"
import { IUser } from '../interfaces/Users'

interface Props {
    userList: IUser[] | [],
    setSelectedUserId: (num: null | number) => void,
    filter: string
}

export const UserList: React.FC<Props> = ({ userList, setSelectedUserId, filter }) => {
    if (userList.length === 0) return <LoadingTag />
    return (
        <div className="user-list">
            <h3>Список пользователей</h3>
            {filter === 'name' && userList.sort((a, b) => a.name.localeCompare(b.name)).map(user => <UserListItem key={user.id} user={user} setSelectedUserId={setSelectedUserId} />)}
            {filter === 'city' && userList.sort((a, b) => a.address.city.localeCompare(b.address.city)).map(user => <UserListItem key={user.id} user={user} setSelectedUserId={setSelectedUserId} />)}
            {filter === 'company' && userList.sort((a, b) => a.company.name.localeCompare(b.company.name)).map(user => <UserListItem key={user.id} user={user} setSelectedUserId={setSelectedUserId} />)}
            <div>Найдено <b>{userList.length}</b> пользователей</div>
        </div>
    )
}