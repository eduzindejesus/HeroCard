import { useParams } from 'react-router-dom';
import { useMarvel } from '../contexts/MarvelContext';

export default function HeroDetails() {
  const { id } = useParams();
  const { state } = useMarvel();

  const hero = state.heroesAdded.find(h => String(h.id) === id);

  if (!hero) return <p>Herói não encontrado.</p>;

  return (
    <div>
      <h1>{hero.name}</h1>
      <img src={hero.imageUrl} alt={hero.name} />
      <p>{hero.description || 'Sem descrição disponível.'}</p>
    </div>
  );
}
