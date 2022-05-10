import React, { useState, useRef } from "react"
import { IUser } from '../interfaces/Users'
import { emailValidation } from '../validation/Email'
import "./Profile.scss"
interface Props {
    userList: IUser[] | [],
    selectedUserId: number,
    setSelectedUserId: (num: null | number) => void
}

export const Profile: React.FC<Props> = ({ userList, selectedUserId, setSelectedUserId }) => {
    const nameRef = useRef<HTMLInputElement>(null!)
    const nicknameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)
    const cityRef = useRef<HTMLInputElement>(null!)
    const streetRef = useRef<HTMLInputElement>(null!)
    const zipcodeRef = useRef<HTMLInputElement>(null!)
    const phoneRef = useRef<HTMLInputElement>(null!)
    const websiteRef = useRef<HTMLInputElement>(null!)
    const commentRef = useRef<HTMLInputElement>(null)

    const [userData] = useState<IUser | undefined>(() => {
        return userList.find(u => u.id === selectedUserId)
    })
    const [canEdit, setCanEdit] = useState(false)

    function closeProfile() {
        setSelectedUserId(null)
    }

    function toggleEditing() {
        setCanEdit(p => !p)
    }

    function save() {
        // Проверка обязательных полей на пустоту
        if (!nameRef.current?.value
            || !nicknameRef.current?.value
            || !cityRef.current?.value
            || !streetRef.current?.value
            || !zipcodeRef.current?.value
            || !phoneRef.current?.value
            || !websiteRef.current?.value) return alert('Все поля обязательны для заполнения, кроме комментария')

        // Валидация почты
        if (!emailValidation(String(emailRef.current?.value))) return alert('Неподходящая почта')


        // Вывод в консоль сохранённых данных в соответствии задания
        let newData = {
            name: nameRef.current.value,
            nickname: nicknameRef.current.value,
            email: emailRef.current.value,
            city: cityRef.current.value,
            street: streetRef.current.value,
            zipcode: zipcodeRef.current.value,
            phone: phoneRef.current.value,
            website: websiteRef.current.value,
            comment: commentRef.current?.value,
        }

        console.log('Вывод объекта по заданию')
        console.log(newData)

        setCanEdit(p => !p)
    }

    if (!userData) return <></>
    return (
        <div className="profile">
            <button onClick={closeProfile}>Вернуться к списку</button>
            <h3>Данные пользователя</h3>
            <label>Имя: </label>
            <input ref={nameRef} type={'text'} disabled={!canEdit} defaultValue={userData.name} />
            <label>Никнейм: </label>
            <input ref={nicknameRef} type={'text'} disabled={!canEdit} defaultValue={userData.username} />
            <label>Почта: </label>
            <input ref={emailRef} type={'text'} disabled={!canEdit} defaultValue={userData.email} />
            <label>Город: </label>
            <input ref={cityRef} type={'text'} disabled={!canEdit} defaultValue={userData.address.city} />
            <label>Улица: </label>
            <input ref={streetRef} type={'text'} disabled={!canEdit} defaultValue={userData.address.street} />
            <label>Индекс: </label>
            <input ref={zipcodeRef} type={'text'} disabled={!canEdit} defaultValue={userData.address.zipcode} />
            <label>Телефон: </label>
            <input ref={phoneRef} type={'text'} disabled={!canEdit} defaultValue={userData.phone} />
            <label>Сайт: </label>
            <input ref={websiteRef} type={'text'} disabled={!canEdit} defaultValue={userData.website} />
            <label>Комментарий: </label>
            <input ref={commentRef} type={'text'} disabled={!canEdit} defaultValue={''} />
            <div>Все поля обязательны, кроме комментария</div>
            <button onClick={toggleEditing}>Редактировать</button>
            {canEdit && <button onClick={save}>Сохранить</button>}
        </div>
    )
}