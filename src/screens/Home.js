import React, { useEffect, useState, useRef } from 'react'
import Header from '../components/Header';
import Card from '../components/Card';
import '../styles/HomeStyle.css'

const Home = () => {
  const isMounted = useRef(true);
  const [institutions, setInstitutions] = useState([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const username = '5ba67756-680c-439f-8161-1494437d1835';
  const password = '8UhMlwazj9Ec*tM8fp@D2_jvjmoHCAeUnwdlhn2smtVxWLMZltMQILVtZ60w_ApX';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted.current) {
          return;
        }

        const cachedInstitutions = JSON.parse(localStorage.getItem('cachedInstitutions')) || [];

        if (cachedInstitutions.length > 0 && !fetchCompleted) {
          setInstitutions(cachedInstitutions);
          setInitialLoading(false);
        } else {
          const response = await fetch('https://sandbox.belvo.com/api/institutions/', {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
          });

          if (!response.ok) {
            console.error('Error al obtener las instituciones');
            return;
          }

          const data = await response.json();
          setInstitutions(data.results);
          setFetchCompleted(true);
          setInitialLoading(false);

          if (JSON.stringify(data.results) !== JSON.stringify(cachedInstitutions)) {
            localStorage.setItem('cachedInstitutions', JSON.stringify(data.results));
          }
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [username, password, institutions, fetchCompleted]);

  return (
    <div className="home-container">
      <Header />
      <main className="content">
        <h2>Listado Bancos</h2>
        {initialLoading ? (
          <div>Cargando...</div>
        ) : (
          <div>
            <h3>Instituciones:</h3>
            <div className="card-container">
              {institutions.map((institution) => (
                <Card key={institution.id} institution={institution} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
