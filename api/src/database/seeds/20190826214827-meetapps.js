const date = new Date();

const subscribers = [...Array(51).keys()].filter(n => n !== 0);

const description =
  'O Community Challenge é uma competição global criada pelo Developer Circles from Facebook. Seu desafio é criar um software que utilize pelo menos uma das três tecnologias: React360, Spark AR ou Jogos em HTML5.\n';

const location = 'Av. Paulista, 1234';

const meetapps = [
  {
    id: 1,
    title: 'React 360 - Community Challenge',
    description,
    location,
    date: '2019-09-28T18:00:00.000Z',
    owner_id: 1,
    banner_id: 1,
    updated_at: date,
    created_at: date,
    canceled_at: null,
    subscribers,
  },
  {
    id: 2,
    title: 'Vue.js summit 2019',
    description,
    location,
    date: '2019-09-30T18:00:00.000Z',
    owner_id: 43,
    banner_id: 2,
    updated_at: date,
    created_at: date,
    canceled_at: null,
    subscribers,
  },
  {
    id: 3,
    title: 'ReactSP36 - Especial Frontend Week',
    description,
    location,
    date: '2019-09-31T18:00:00.000Z',
    owner_id: 27,
    banner_id: 3,
    updated_at: date,
    created_at: date,
    canceled_at: null,
    subscribers,
  },
  {
    id: 4,
    title: 'Rocketseat summit 2019',
    description,
    location,
    date: '2019-09-01T18:00:00.000Z',
    owner_id: 5,
    banner_id: 4,
    updated_at: date,
    created_at: date,
    canceled_at: null,
    subscribers,
  },
  {
    id: 5,
    title: 'Frontend SP - Especial FrontendWeek!',
    description,
    location,
    date: '2019-09-11T18:00:00.000Z',
    owner_id: 7,
    banner_id: 5,
    updated_at: date,
    created_at: date,
    canceled_at: null,
    subscribers,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('meetapps', meetapps, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "meetapps_id_seq" RESTART WITH ${meetapps.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('meetapps', null, {}),
};
