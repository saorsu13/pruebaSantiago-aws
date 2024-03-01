import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CardStyle.css';

const DetailsCard = ({ account }) => {
  return (
    <Link to={`/account/${account.id}`} className="card-link">
      <div className="card">
        <div className="card-content">
          <h3>{account.name}</h3>
          <p>Type: {account.type}</p>
          <p>Number: {account.number}</p>
        </div>
      </div>
    </Link>
  );
};

export default DetailsCard;
