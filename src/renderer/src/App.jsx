import { useEffect, useState } from 'react'
import electronLogo from './assets/logo.png'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router';

function App() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await window.api.getPartners();
      setPartners(res);
    })();
  }, [])

  console.log(partners);

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <ul className='partners-list'>
        {partners.map((partner) => (
          <li className="partner-card" key={partner.id} onClick={() => { navigate('/update', { state: { partner } }) }}>
            <div className="partner-data">
              <p className="card_heading">{partner.type} | {partner.name}</p>
              <div className="partner-data-info">
                <p>{partner.ceo}</p>
                <p>{partner.phone}</p>
                <p>Рейтинг: {partner.rating}</p>
              </div>
            </div>
            <div className="partner-sale partner-data card_heading">
              {partner.discount}%
            </div>
          </li>
        ))}  
      </ul>

      <Link to={'/create'}>
        <button>Добавить пользователя</button>
      </Link>
    </>
  )
}

export default App