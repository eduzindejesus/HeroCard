const db = require('./src/config/db');

const heroes = [
  {
    name: 'Naruto Uzumaki',
    description: 'Um ninja determinado que sonha em se tornar Hokage para proteger sua vila e ganhar respeito. É conhecido por seu espírito indomável e pela poderosa Kurama, a raposa de nove caudas selada dentro dele.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/Naruto_vol._01.jpg',
  },
  {
    name: 'Izuku Midoriya (Deku)',
    description: 'Um jovem sem poderes em um mundo onde quase todos têm, que herda o poder One For All. Determinado a se tornar o maior herói e proteger os inocentes, ele treina duro para dominar seu poder.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/82/Izuku_Midoriya_concept_art_omake.png',
  },
  {
    name: 'Monkey D. Luffy',
    description: 'Capitão dos Chapéus de Palha, seu sonho é se tornar o Rei dos Piratas. Luffy possui o poder da Gomu Gomu no Mi, que o torna um homem-borracha, e sempre protege seus amigos e luta pela justiça.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/f/fd/Opluffy.png/250px-Opluffy.png',
  },
  {
    name: 'Saitama (One Punch Man)',
    description: 'Um herói tão forte que derrota qualquer inimigo com um só soco. Embora seu poder seja incomparável, Saitama luta com tédio e busca um desafio verdadeiro para testar suas habilidades.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/3/37/Saitama_One_Punch-Man.png',
  },
  {
    name: 'Goku',
    description: 'Um Saiyajin criado na Terra, conhecido por sua força sobre-humana e por sempre proteger o planeta e seus amigos contra ameaças poderosas. Goku é símbolo de determinação e superação constante.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/0/07/SonGoku.jpg',
  },
];

db.serialize(() => {
  // Insere os heróis
  heroes.forEach(({ name, description, imageUrl }) => {
    db.run(
      'INSERT INTO heroes (name, description, imageUrl) VALUES (?, ?, ?)',
      [name, description, imageUrl],
      (err) => {
        if (err) return console.error('Erro ao inserir herói:', err);
      }
    );
  });

  // Insere o usuário admin
  db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    ['admin', '1234'],
    (err) => {
      if (err) return console.error('Erro ao inserir usuário admin:', err);
      console.log('Usuário admin inserido com sucesso.');
    }
  );

  console.log('Heróis inseridos com sucesso.');
});
