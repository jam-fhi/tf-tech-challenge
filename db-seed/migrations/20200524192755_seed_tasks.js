exports.up = function (knex) {
	return knex('tasks').insert([
		{
			userid: 1,
			taskname: 'Make a cup of tea',
		},
		{
			userid: 2,
			taskname: 'Check the left wing',
		},
	]);
};

exports.down = function (knex) {
	return knex('tasks').where('userid', 1).orWhere('userid', 2).del();
};
