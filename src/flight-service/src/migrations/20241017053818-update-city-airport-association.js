'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {   // modified table
     
    await queryInterface.addConstraint('Airports' ,  {
      type:'FOREIGN KEY',
      name:'city_fkey_constraint',
      fields:['cityId'],
      references:{
        table:'Cities',
        field:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    
    // to roll back our migrations 

    await queryInterface.removeConstraint( 'Airports' , 'city_fkey_constraint'    ); // removes modification made
  }
};




// SELECT 
//   TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
// FROM
//   INFORMATION_SCHEMA.KEY_COLUMN_USAGE
// WHERE
//   REFERENCED_TABLE_SCHEMA = 'flights' 
//   AND REFERENCED_TABLE_NAME = 'airports';