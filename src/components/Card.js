import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CardStyle.css';

const Card = ({ institution }) => {
  return (
    <Link to={`/bank/${institution.id}`} className="card-link">
      <div className="card">
        <div className="card-content">
          <h3>{institution.display_name}</h3>
            <p>Tipo: {institution.type}</p>
        </div>
        {institution.logo && (
          <div className="card-logo">
            <img src={institution.logo} alt="Logo de la institución" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
