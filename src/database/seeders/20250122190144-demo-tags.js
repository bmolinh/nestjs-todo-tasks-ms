'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          name: 'Demo Tag 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Demo Tag 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
