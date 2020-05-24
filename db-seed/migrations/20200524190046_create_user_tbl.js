exports.up = function (knex) {
	return knex.schema.createTable('user', function (t) {
		t.increments('id').unsigned().primary();

		t.string('first_name').notNull();
		t.string('last_name').notNull();
		t.string('email').notNull();
		t.string('username').notNull();
		t.string('password').notNull();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('user');
};
