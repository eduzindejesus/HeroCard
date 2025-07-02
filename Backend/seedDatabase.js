const db = require('./src/config/db');
const bcrypt = require('bcrypt');

const heroes = [
  {
    name: 'Naruto Uzumaki',
    description: 'Um ninja determinado que sonha em se tornar Hokage...',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/d/d2/Naruto_vol._01.jpg',
  },
  {
    name: 'Izuku Midoriya (Deku)',
    description: 'Um jovem sem poderes em um mundo onde quase todos têm...',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/82/Izuku_Midoriya_concept_art_omake.png',
  },
  {
    name: 'Monkey D. Luffy',
    description: 'Capitão dos Chapéus de Palha...',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/thumb/f/fd/Opluffy.png/250px-Opluffy.png',
  },
  {
    name: 'Saitama (One Punch Man)',
    description: 'Um herói tão forte que derrota qualquer inimigo com um só soco...',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/3/37/Saitama_One_Punch-Man.png',
  },
  {
    name: 'Goku',
    description: 'Um Saiyajin criado na Terra...',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/0/07/SonGoku.jpg',
  },
  {
    name: 'Spider-Man',
    description: 'Um jovem com habilidades aracnídeas, que combate o crime em Nova York.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/pt/8/89/Superior_spider_man.png',
  },
  {
    name: 'Iron Man',
    description: 'Gênio bilionário e inventor que se torna o Homem de Ferro após construir uma armadura.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png',
  },
  {
    name: 'Captain America',
    description: 'Um super soldado com força sobre-humana, luta pela liberdade e pela justiça.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bf/CaptainAmericaHughes.jpg',
  },
  {
    name: 'Black Panther',
    description: 'Rei de Wakanda e herói com habilidades aprimoradas, além de uma traje de Vibranium.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Black_Panther_OS_Vol_1_2.png',
  },


];

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash('1234', 10);

    db.serialize(() => {
      // Inserir heróis
      heroes.forEach(({ name, description, imageUrl }) => {
        db.run(
          'INSERT INTO heroes (name, description, imageUrl) VALUES (?, ?, ?)',
          [name, description, imageUrl],
          (err) => {
            if (err) return console.error('Erro ao inserir herói:', err);
          }
        );
      });

      // Inserir admin com senha criptografada
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword],
        (err) => {
          if (err) return console.error('Erro ao inserir usuário admin:', err);
          console.log('Usuário admin inserido com sucesso.');
        }
      );

      console.log('Heróis inseridos com sucesso.');
    });
  } catch (err) {
    console.error('Erro ao gerar hash da senha:', err);
  }
}

seed();
