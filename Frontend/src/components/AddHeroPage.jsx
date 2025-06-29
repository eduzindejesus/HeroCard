import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMarvel } from '../contexts/MarvelContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  imageUrl: yup.string().url('URL inválida').required('URL da imagem é obrigatória'),
});

export default function AddHeroPage() {
  const { dispatch } = useMarvel();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Erro ao adicionar herói');

      const newHero = await response.json();
      dispatch({ type: 'ADD_HERO', payload: newHero });
      navigate('/');
    } catch (err) {
      alert('Erro ao adicionar herói');
    }
  };

  return (
    <div className="form-container">
      <h2>Adicionar Novo Herói</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-hero-form">
        <input type="text" placeholder="Nome do herói" {...register('name')} />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <textarea placeholder="Descrição" {...register('description')} />
        {errors.description && <p className="error">{errors.description.message}</p>}

        <input type="text" placeholder="URL da imagem" {...register('imageUrl')} />
        {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
