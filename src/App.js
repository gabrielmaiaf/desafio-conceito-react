import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repo, setRepo] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepo(response.data);
    });
  }, [])

  async function handleAddRepository() {
    await api.post('/repositories', {
      id: '123as5-152882',
      url: 'https://github.com/gabrielmaiaf/gabrielmaiaf',
      title: `Disclaimer do usuário ${Date.now()}`,
      techs: ['nodejs', 'react', 'react-native']
    }).then(res => {
      setRepo([...repo, res.data]);
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepo = repo.filter(r => r.id !== id);

    return setRepo([...newRepo]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map(r => (
          <li key={r.id}>
            {r.title}

            <button type="button" onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
