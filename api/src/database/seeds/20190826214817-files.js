const date = new Date();

const file = [
  {
    id: 1,
    name: 'react2.jpeg',
    path: 'example/react2.jpeg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 2,
    name: 'vuejs.jpeg',
    path: 'example/vuejs.jpeg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 3,
    name: 'react.jpeg',
    path: 'example/react.jpeg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 4,
    name: 'rocketseat.jpg',
    path: 'example/rocketseat.jpg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
  {
    id: 5,
    name: 'frontsampa.jpeg',
    path: 'example/frontsampa.jpeg',
    type: 'banner',
    created_at: date,
    updated_at: date,
  },
];

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert('files', file, {});
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "files_id_seq" RESTART WITH ${file.length + 1}`
    );
  },
  down: queryInterface => queryInterface.bulkDelete('files', null, {}),
};
