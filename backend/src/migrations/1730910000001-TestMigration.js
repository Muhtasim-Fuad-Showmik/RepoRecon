const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class TestMigration1730910000001 {
    name = 'TestMigration1730910000001'

    async up(queryRunner) {
        console.log('Test migration up');
    }

    async down(queryRunner) {
        console.log('Test migration down');
    }
};
