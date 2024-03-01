import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import DetailsCard from '../components/DetailsCard';
import Header from '../components/Header';
import '../styles/HomeStyle.css';

const BankDetail = () => {
  const { id } = useParams();
  const [mfaToken, setMFAToken] = useState(null);
  const [additionalAccountsResponse, setAdditionalAccountsResponse] = useState(null);
  const navigate = useNavigate();

  const username = '5ba67756-680c-439f-8161-1494437d1835';
  const password = '8UhMlwazj9Ec*tM8fp@D2_jvjmoHCAeUnwdlhn2smtVxWLMZltMQILVtZ60w_ApX';
  const baseUrl = 'https://sandbox.belvo.com';

  const fetchWithAuth = async (url, options) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
      },
    });
    return response;
  };

  const handleMFA = async (tokenToUse) => {
    const userProvidedToken = tokenToUse || prompt('Ingrese el token MFA');

    if (userProvidedToken === null) {
      navigate('/home');
      return;
    }

    setMFAToken(userProvidedToken);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedAccounts = sessionStorage.getItem(`accounts_${id}`);
        if (cachedAccounts) {
          const cachedData = JSON.parse(cachedAccounts);
          setAdditionalAccountsResponse(cachedData);
          return;
        }

        const bankDetailsResponse = await fetchWithAuth(`${baseUrl}/api/institutions/${id}/`, {
          method: 'GET',
        });

        if (!bankDetailsResponse.ok) {
          return;
        }

        const bankDetails = await bankDetailsResponse.json();

        const institutionsResponse = await fetchWithAuth(`${baseUrl}/api/links/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "institution": bankDetails.name,
            "username": bankDetails.id,
            "password": "full",
            "external_id": "security-testing",
            "access_mode": "single",
            "credentials_storage": "5d",
            "stale_in": "30d",
            "fetch_resources": bankDetails.resources,
          }),
        });

        if (!institutionsResponse.ok) {
          console.error('Error al obtener las instituciones');
          return;
        }

        const institutionsData = await institutionsResponse.json();
        const linkResponseId = institutionsData.id;

        const tokenToUse = mfaToken || "1234ab";

        const accountsResponse = await fetchWithAuth(`${baseUrl}/api/accounts/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "link": linkResponseId,
            "token": tokenToUse,
            "save_data": true,
          }),
        });

        if (accountsResponse.status === 428) {
          const mfaData = await accountsResponse.json();
          await handleMFA();
          return;
        }

        if (!accountsResponse.ok) {
          const errorData = await accountsResponse.json();
          console.error('Error al obtener las cuentas:', errorData);
          throw new Error('Error en la solicitud de cuentas');
        }

        const fetchedAccountsData = await accountsResponse.json();

        const link = fetchedAccountsData[0].link;

        const additionalAccountsResponse = await fetchWithAuth(`${baseUrl}/api/accounts/?page=1&link=${link}`, {
          method: 'GET',
        });

        if (!additionalAccountsResponse.ok) {
          console.error('Error al obtener cuentas adicionales');
          return;
        }

        const additionalAccountsData = await additionalAccountsResponse.json();
        console.log('Balance adicional:', additionalAccountsData.results[0].balance);

        setAdditionalAccountsResponse(additionalAccountsData);
        
        sessionStorage.setItem(`accounts_${id}`, JSON.stringify(additionalAccountsData));
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchData();
  },  [username, password, id, mfaToken, navigate, baseUrl]);

  return (
    <div className="home-container">
    <Header />
    <div className="content">
      <h2>Listado Cuentas</h2>
      {additionalAccountsResponse ? (
        <div>
          {additionalAccountsResponse.results.map(account => (
            <DetailsCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  </div>
);
};

export default BankDetail;
