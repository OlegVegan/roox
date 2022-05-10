// React
import React from "react"

// Interfaces
import { IUser } from '../interfaces/Users'

type UserItem = {
    user: IUser,
    setSelectedUserId: (num: null | number) => void
}

export const UserListItem: React.FC<UserItem> = ({ user, setSelectedUserId }) => {
    const id = user.id
    const name = user.name
    const city = user.address.city
    const companyName = user.company.name

    function handleClick() {
        // Запоминаем юзера
        setSelectedUserId(id)
    }

    return (
        <div className="user-list-item">
            <b>{name}</b>, город: {city}, компания {companyName}
            <button onClick={handleClick}>Подробнее</button>
        </div>
    )
}
