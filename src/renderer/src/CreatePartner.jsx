import { useEffect } from "react"
import { Link } from "react-router";

export default function CreatePartner() {
    async function submitHandler(e) {
        e.preventDefault()
        const partner = {
            type: e.target.type.value,
            name: e.target.name.value,
            ceo: e.target.ceo.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            address: e.target.address.value,
            inn: e.target.inn.value,
            rating: e.target.rating.value,
        }
        await window.api.createPartner(partner);
        document.querySelector('form').reset()
    }

    return (
    <div className="form">
        <Link to={'/'}>
            <button>{'<--- Назад'}</button>
        </Link>
        <p>Добавить партнера</p>
        <form onSubmit={(e) => submitHandler(e)}>
            <label htmlFor="name">Наименование:</label>
            <input id="name" type="text" required />
            <label htmlFor="type">Тип партнера:</label>
            <select name="" id="type">
                <option value="ПАО">ПАО</option>
                <option value="ЗАО">ЗАО</option>
                <option value="ООО">ООО</option>
                <option value="ОАО">ОАО</option>
            </select>
            <label htmlFor="rating">Рейтинг:</label>
            <input id="rating" type="number" step="1" min='0' max='100' required />

            <label htmlFor="inn">Инн:</label>
            <input id="inn" type="text" required />

            <label htmlFor="address">Адрес:</label>
            <input id="address" type="text" required />
            <label htmlFor="ceo">ФИО директора:</label>
            <input id="ceo" type="text" required />
            <label htmlFor="phone">Телефон:</label>
            <input id="phone" type="tel" required />
            <label htmlFor="email">Email компании:</label>
            <input id="email" type="email" required />
            <button type="submit">Создать партнера</button>
        </form>
    </div>
    );
}