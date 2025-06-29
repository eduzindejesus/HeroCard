import React, { useState } from 'react';
import { useMarvel } from '../contexts/MarvelContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function HeroCardList() {
  const { state } = useMarvel();
  const { logout } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');

  // Garantir que seja array
  const heroesAdded = Array.isArray(state.heroesAdded) ? state.heroesAdded : [];

  // Filtra por nome, case insensitive
  const filterHeroes = (heroes) =>
    heroes.filter((hero) =>
      hero.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredAddedHeroes = filterHeroes(heroesAdded);

  const isLoading = filteredAddedHeroes.length === 0 && !state.error;

  return (
    <div style={{ padding: '20px' }}>
      <div className="header-buttons">
        <button onClick={logout} className="logout-btn">Sair</button>
        <Link to="/adicionar" className="add-btn">Adicionar Herói</Link>
      </div>

      <h1>Heróis do Meu Banco</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {state.error && <p style={{ color: 'red', marginTop: '1rem' }}>{state.error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {isLoading ? (
          <p>Carregando heróis...</p>
        ) : filteredAddedHeroes.length === 0 ? (
          <p>Nenhum herói encontrado para "{searchTerm}"</p>
        ) : (
          filteredAddedHeroes.map((hero) => {
            const imgSrc = hero.imageUrl && hero.imageUrl.trim() !== ''
              ? hero.imageUrl
              : 'https://via.placeholder.com/150?text=Sem+Imagem';


            return (
              <div key={`local-${hero.id}`} className="hero-card">
                <Link to={`/hero/${hero.id}`} className="hero-link">
                  <img src={imgSrc} alt={hero.name || 'Herói sem nome'} />
                  <h2>{hero.name || 'Sem nome'}</h2>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
