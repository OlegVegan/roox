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
            <div className="user-list-item__label"><label>ФИО: </label>{name}</div>
            <div className="user-list-item__label"><label>Город: </label>{city}</div>
            <div className="user-list-item__label"><label>Компания: </label>{companyName}</div>
            <span onClick={handleClick}>Подробнее</span>
        </div>
    )
}
