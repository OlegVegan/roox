import React from 'react'

interface Props {
    filter: string,
    setFilter: (filter: string) => void,
    selectedUserId: null | number,
    setSelectedUserId: (num: null | number) => void
}

export const LeftPanel: React.FC<Props> = ({ filter, setFilter, selectedUserId, setSelectedUserId }) => {

    function handleClick(type: string) {
        setFilter(type)

        // Если находимся в профиле, просим подтверждение на выход
        if (selectedUserId === null) return
        if (!window.confirm('Выйти из редактирования профиля?')) return
        setSelectedUserId(null)
    }

    return (
        <div className='left-panel'>
            <h3>Сортировка</h3>
            <button onClick={() => handleClick('name')} className={filter === 'name' ? 'active' : ""}>по имени</button>
            <button onClick={() => handleClick('city')} className={filter === 'city' ? 'active' : ""}>по городу</button>
            <button onClick={() => handleClick('company')} className={filter === 'city' ? 'active' : ""}>по компании</button>
        </div>
    )
}
