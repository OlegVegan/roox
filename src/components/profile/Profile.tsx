import React, { useState, useRef, FocusEvent } from "react"
import { IUser } from '../interfaces/Users'
import { emailValidation } from '../validation/Email'
import { LoadingTag } from "../icons/Icons"
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
    const commentRef = useRef<HTMLTextAreaElement>(null)

    const [userData] = useState<IUser | undefined>(() => {
        return userList.find(u => u.id === selectedUserId)
    })
    const [canEdit, setCanEdit] = useState(false)

    function closeProfile() {
        // Проверка на случай, если редактируется материал
        if (canEdit) {
            if (!window.confirm('Выйти к списку без сохранения изменений?')) return
        }

        setSelectedUserId(null)
    }

    function toggleEditing() {
        setCanEdit(p => !p)
    }

    function send() {
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
            id: userData?.id,
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            username: nicknameRef.current.value,
            website: websiteRef.current.value,
            company: {
                bs: userData?.company.bs,
                name: userData?.company.name,
                catchPhrase: userData?.company.catchPhrase,
            },
            address: {
                city: cityRef.current.value,
                street: streetRef.current.value,
                suite: userData?.address.suite,
                zipcode: zipcodeRef.current.value,
                geo: {
                    lat: userData?.address.geo.lat,
                    lng: userData?.address.geo.lng,
                },
            },
            comment: commentRef.current?.value
        }

        // В задании не сказано выводить ли объект по схеме оригинального или создать новый, я решил вывести по старой схеме
        console.log('Вывод объекта по заданию:')
        console.log(newData)

        setCanEdit(p => !p)
    }

    function inputCheck(e: FocusEvent<HTMLInputElement>) {
        if (!e.target.value) return e.target.classList.add('warning')
        return e.target.classList.remove('warning')
    }

    if (!userData) return <LoadingTag />
    return (
        <div className="profile">
            <div className="profile-header">
                <button className="profile-edit-btn" onClick={toggleEditing}>Редактировать</button>
                <div className="profile-header-label">Данные пользователя</div>
            </div>
            <div className="profile-data">
                <label>Имя: </label>
                <input ref={nameRef} type={'text'} disabled={!canEdit} defaultValue={userData.name} onBlur={(e) => inputCheck(e)} />
                <label>Никнейм: </label>
                <input ref={nicknameRef} type={'text'} disabled={!canEdit} defaultValue={userData.username} onBlur={(e) => inputCheck(e)} />
                <label>Почта: </label>
                <input ref={emailRef} type={'text'} disabled={!canEdit} defaultValue={userData.email} onBlur={(e) => inputCheck(e)} />
                <label>Город: </label>
                <input ref={cityRef} type={'text'} disabled={!canEdit} defaultValue={userData.address.city} onBlur={(e) => inputCheck(e)} />
                <label>Улица: </label>
                <input ref={streetRef} type={'text'} disabled={!canEdit} defaultValue={userData.address.street} onBlur={(e) => inputCheck(e)} />
                <label>Индекс: </label>
                <input ref={zipcodeRef} type={'text'} disabled={!canEdit} defaultValue={userData.address.zipcode} onBlur={(e) => inputCheck(e)} />
                <label>Телефон: </label>
                <input ref={phoneRef} type={'text'} disabled={!canEdit} defaultValue={userData.phone} onBlur={(e) => inputCheck(e)} />
                <label>Сайт: </label>
                <input ref={websiteRef} type={'text'} disabled={!canEdit} defaultValue={userData.website} onBlur={(e) => inputCheck(e)} />
                <label>Комментарий: </label>
                <textarea ref={commentRef} disabled={!canEdit} defaultValue={''} ></textarea>
                <button className="profile-back-btn" onClick={closeProfile}>Вернуться к списку</button>
                {canEdit && <button className="profile-send-btn" onClick={send}>Отправить</button>}
            </div>
        </div>
    )
}