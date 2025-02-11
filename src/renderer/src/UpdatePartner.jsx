import { useState } from "react";
import { useLocation, Link } from 'react-router-dom';

export default function UpdatePartner() {
    const location = useLocation();
    const initialPartner = location.state?.partner || {};
    const [partner, setPartner] = useState(initialPartner);

    async function submitHandler(e) {
        e.preventDefault();
        const updPartner = {
            id: partner.id,
            type: e.target.type.value,
            name: e.target.name.value,
            director: e.target.director.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            adresse: e.target.adresse.value,
            rating: e.target.rating.value,
        };
        
        await window.api.updatePartner(updPartner);
        setPartner(updPartner);
        e.target.reset();
    }

    return (
        <div className="form">
            <Link to={'/'}><button>{"<-- Назад"}</button></Link>
            <h1>Обновить партнера</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">Наименование:</label>
                <input id="name" type="text" required defaultValue={partner.name} />
                
                <label htmlFor="type">Тип партнера:</label>
                <select name="type" id="type" required defaultValue={partner.type}>
                    <option value="ЗАО">ЗАО</option>
                    <option value="ООО">ООО</option>
                    <option value="ОАО">ОАО</option>
                    <option value="ПАО">ПАО</option>
                </select>

                <label htmlFor="rating">Рейтинг:</label>
                <input id="rating" type="number" step="1" min="0" max="100" required defaultValue={partner.rating} />

                <label htmlFor="adresse">Адрес:</label>
                <input id="adresse" type="text" required defaultValue={partner.adresse} />

                <label htmlFor="director">ФИО директора:</label>
                <input id="director" type="text" required defaultValue={partner.director} />
                <label htmlFor="phone">Телефон:</label>
                <input id="phone" type="tel" required defaultValue={partner.phone} />

                <label htmlFor="email">Email компании:</label>
                <input id="email" type="email" required defaultValue={partner.email} />

                <button type="submit">Обновить партнера</button>
            </form>
        </div>
    );
}