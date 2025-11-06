const { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } = require("typeorm");

module.exports = class InitialSchema1730910000000 {
    name = 'InitialSchema1730910000000'

    async up(queryRunner) {
        // Create users table
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'role',
                    type: 'varchar',
                    default: `'developer'`
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        // Create projects table
        await queryRunner.createTable(new Table({
            name: 'project',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        // Create bugs table
        await queryRunner.createTable(new Table({
            name: 'bug',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '200'
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: `'new'`
                },
                {
                    name: 'priority',
                    type: 'varchar',
                    default: `'medium'`
                },
                {
                    name: 'severity',
                    type: 'varchar',
                    default: `'minor'`
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        // Create technical_debt table
        await queryRunner.createTable(new Table({
            name: 'technical_debt',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'status',
                    type: 'varchar',
                    default: `'identified'`
                },
                {
                    name: 'effortEstimate',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'debtType',
                    type: 'varchar',
                    default: `'code'`
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        // Create bug_comment table
        await queryRunner.createTable(new Table({
            name: 'bug_comment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'content',
                    type: 'text'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        // Create technical_debt_comment table
        await queryRunner.createTable(new Table({
            name: 'technical_debt_comment',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'content',
                    type: 'text'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        // Add foreign keys for project relationships
        await queryRunner.addColumn('project', new TableColumn({
            name: 'ownerId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('project', new TableForeignKey({
            columnNames: ['ownerId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));

        // Add foreign keys for bug relationships
        await queryRunner.addColumn('bug', new TableColumn({
            name: 'projectId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('bug', new TableForeignKey({
            columnNames: ['projectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'project',
            onDelete: 'CASCADE'
        }));

        await queryRunner.addColumn('bug', new TableColumn({
            name: 'assigneeId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('bug', new TableForeignKey({
            columnNames: ['assigneeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));

        await queryRunner.addColumn('bug', new TableColumn({
            name: 'reporterId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('bug', new TableForeignKey({
            columnNames: ['reporterId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));

        // Add foreign keys for technical debt relationships
        await queryRunner.addColumn('technical_debt', new TableColumn({
            name: 'projectId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('technical_debt', new TableForeignKey({
            columnNames: ['projectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'project',
            onDelete: 'CASCADE'
        }));

        await queryRunner.addColumn('technical_debt', new TableColumn({
            name: 'assigneeId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('technical_debt', new TableForeignKey({
            columnNames: ['assigneeId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));

        await queryRunner.addColumn('technical_debt', new TableColumn({
            name: 'reporterId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('technical_debt', new TableForeignKey({
            columnNames: ['reporterId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));

        // Add foreign keys for comment relationships
        await queryRunner.addColumn('bug_comment', new TableColumn({
            name: 'bugId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('bug_comment', new TableForeignKey({
            columnNames: ['bugId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'bug',
            onDelete: 'CASCADE'
        }));

        await queryRunner.addColumn('bug_comment', new TableColumn({
            name: 'authorId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('bug_comment', new TableForeignKey({
            columnNames: ['authorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));

        await queryRunner.addColumn('technical_debt_comment', new TableColumn({
            name: 'technicalDebtId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('technical_debt_comment', new TableForeignKey({
            columnNames: ['technicalDebtId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'technical_debt',
            onDelete: 'CASCADE'
        }));

        await queryRunner.addColumn('technical_debt_comment', new TableColumn({
            name: 'authorId',
            type: 'uuid',
            isNullable: true
        }));

        await queryRunner.createForeignKey('technical_debt_comment', new TableForeignKey({
            columnNames: ['authorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'SET NULL'
        }));
    }

    async down(queryRunner) {
        // Drop foreign keys first
        const bugCommentTable = await queryRunner.getTable('bug_comment');
        const technicalDebtCommentTable = await queryRunner.getTable('technical_debt_comment');
        const technicalDebtTable = await queryRunner.getTable('technical_debt');
        const bugTable = await queryRunner.getTable('bug');
        const projectTable = await queryRunner.getTable('project');

        if (bugCommentTable) {
            const bugCommentBugFk = bugCommentTable.foreignKeys.find(fk => fk.columnNames.indexOf('bugId') !== -1);
            const bugCommentAuthorFk = bugCommentTable.foreignKeys.find(fk => fk.columnNames.indexOf('authorId') !== -1);
            if (bugCommentBugFk) await queryRunner.dropForeignKey('bug_comment', bugCommentBugFk);
            if (bugCommentAuthorFk) await queryRunner.dropForeignKey('bug_comment', bugCommentAuthorFk);
        }

        if (technicalDebtCommentTable) {
            const technicalDebtCommentTechnicalDebtFk = technicalDebtCommentTable.foreignKeys.find(fk => fk.columnNames.indexOf('technicalDebtId') !== -1);
            const technicalDebtCommentAuthorFk = technicalDebtCommentTable.foreignKeys.find(fk => fk.columnNames.indexOf('authorId') !== -1);
            if (technicalDebtCommentTechnicalDebtFk) await queryRunner.dropForeignKey('technical_debt_comment', technicalDebtCommentTechnicalDebtFk);
            if (technicalDebtCommentAuthorFk) await queryRunner.dropForeignKey('technical_debt_comment', technicalDebtCommentAuthorFk);
        }

        if (technicalDebtTable) {
            const technicalDebtProjectFk = technicalDebtTable.foreignKeys.find(fk => fk.columnNames.indexOf('projectId') !== -1);
            const technicalDebtAssigneeFk = technicalDebtTable.foreignKeys.find(fk => fk.columnNames.indexOf('assigneeId') !== -1);
            const technicalDebtReporterFk = technicalDebtTable.foreignKeys.find(fk => fk.columnNames.indexOf('reporterId') !== -1);
            if (technicalDebtProjectFk) await queryRunner.dropForeignKey('technical_debt', technicalDebtProjectFk);
            if (technicalDebtAssigneeFk) await queryRunner.dropForeignKey('technical_debt', technicalDebtAssigneeFk);
            if (technicalDebtReporterFk) await queryRunner.dropForeignKey('technical_debt', technicalDebtReporterFk);
        }

        if (bugTable) {
            const bugProjectFk = bugTable.foreignKeys.find(fk => fk.columnNames.indexOf('projectId') !== -1);
            const bugAssigneeFk = bugTable.foreignKeys.find(fk => fk.columnNames.indexOf('assigneeId') !== -1);
            const bugReporterFk = bugTable.foreignKeys.find(fk => fk.columnNames.indexOf('reporterId') !== -1);
            if (bugProjectFk) await queryRunner.dropForeignKey('bug', bugProjectFk);
            if (bugAssigneeFk) await queryRunner.dropForeignKey('bug', bugAssigneeFk);
            if (bugReporterFk) await queryRunner.dropForeignKey('bug', bugReporterFk);
        }

        if (projectTable) {
            const projectOwnerFk = projectTable.foreignKeys.find(fk => fk.columnNames.indexOf('ownerId') !== -1);
            if (projectOwnerFk) await queryRunner.dropForeignKey('project', projectOwnerFk);
        }

        // Drop columns with foreign keys
        await queryRunner.dropColumn('project', 'ownerId');
        await queryRunner.dropColumn('bug', 'projectId');
        await queryRunner.dropColumn('bug', 'assigneeId');
        await queryRunner.dropColumn('bug', 'reporterId');
        await queryRunner.dropColumn('technical_debt', 'projectId');
        await queryRunner.dropColumn('technical_debt', 'assigneeId');
        await queryRunner.dropColumn('technical_debt', 'reporterId');
        await queryRunner.dropColumn('bug_comment', 'bugId');
        await queryRunner.dropColumn('bug_comment', 'authorId');
        await queryRunner.dropColumn('technical_debt_comment', 'technicalDebtId');
        await queryRunner.dropColumn('technical_debt_comment', 'authorId');

        // Drop tables
        await queryRunner.dropTable('technical_debt_comment');
        await queryRunner.dropTable('bug_comment');
        await queryRunner.dropTable('technical_debt');
        await queryRunner.dropTable('bug');
        await queryRunner.dropTable('project');
        await queryRunner.dropTable('user');
    }
};
