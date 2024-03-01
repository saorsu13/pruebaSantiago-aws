import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CardStyle.css';

const AccountCard = ({ account, transaction }) => {
    return (
        <div className="card">
        <div className="card-content">
          {account && (
            <>
              <h3>{account.name}</h3>
            </>
          )}
          {transaction && (
            <>
              <strong>Tipo:</strong> {transaction.type},{' '}
              <strong>Monto:</strong> {transaction.amount},{' '}
              <strong>Moneda:</strong> {transaction.currency},{' '}
              <strong>Estado:</strong> {transaction.status},{' '}
              <strong>Fecha:</strong> {transaction.value_date},{' '}
              <strong>Referencia:</strong> {transaction.reference}
            </>
          )}
        </div>
      </div>
    );
  };

export default AccountCard;
