import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Digite o nome do herói"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
    />
  );
}
