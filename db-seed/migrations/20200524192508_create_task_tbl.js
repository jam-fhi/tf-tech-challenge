exports.up = function (knex) {
	return knex.schema.createTable('tasks', function (t) {
		t.increments('id').unsigned().primary();

		t.integer('userid').notNull();
		t.string('taskname').notNull();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('tasks');
};
