import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MarvelContext = createContext();

const initialState = {
  heroesAdded: [],
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_HEROES_ADDED':
      return { ...state, heroesAdded: action.payload };
    case 'ADD_HERO':
      return { ...state, heroesAdded: [action.payload, ...state.heroesAdded] };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function MarvelProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchLocalHeroes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/heroes');
        const data = await response.json();

        dispatch({ type: 'SET_HEROES_ADDED', payload: data });
      } catch (err) {
        console.error('Erro ao carregar heróis locais:', err);
        dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar heróis locais' });
      }
    };

    fetchLocalHeroes();
  }, []);

  return (
    <MarvelContext.Provider value={{ state, dispatch }}>
      {children}
    </MarvelContext.Provider>
  );
}

export function useMarvel() {
  return useContext(MarvelContext);
}
