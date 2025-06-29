import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMarvel } from '../contexts/MarvelContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../App.css';

// Definindo o schema de validação com Yup
const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  imageUrl: yup.string().url('URL inválida').required('URL da imagem é obrigatória'),
});

export default function AddHeroPage() {
  const { dispatch } = useMarvel();
  const navigate = useNavigate();
  
  // Estado para armazenar erro
  const [error, setError] = useState('');

  // Configuração do React Hook Form com validação via Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Função para lidar com o envio do formulário
  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/api/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Se a resposta não for ok, lança um erro
      if (!response.ok) {
        throw new Error('Erro ao adicionar herói: ' + response.statusText);
      }

      // Caso a resposta seja ok, pega os dados do herói
      const newHero = await response.json();

      // Dispara uma ação para adicionar o herói no estado global
      dispatch({ type: 'ADD_HERO', payload: newHero });

      // Redireciona para a página inicial
      navigate('/');
    } catch (err) {
      console.error('Erro:', err.message);

      // Atualiza o estado de erro para exibir na interface
      setError('Falha ao adicionar o herói. Por favor, tente novamente.');
    }
  };

  return (
    <div className="form-container">
      <h2>Adicionar Novo Herói</h2>

      {/* Exibe a mensagem de erro, caso haja */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="add-hero-form">
        <div>
          <input
            type="text"
            placeholder="Nome do herói"
            {...register('name')}
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="Descrição"
            {...register('description')}
            className={errors.description ? 'error-input' : ''}
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="URL da imagem"
            {...register('imageUrl')}
            className={errors.imageUrl ? 'error-input' : ''}
          />
          {errors.imageUrl && <p className="error">{errors.imageUrl.message}</p>}
        </div>

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
