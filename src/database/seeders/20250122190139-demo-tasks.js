'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          order: 1,
          title: 'Demo Task 1',
          description: 'This is a demo task',
          completed: false,
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          order: 2,
          title: 'Demo Task 2',
          description: 'This is another demo task',
          completed: false,
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
