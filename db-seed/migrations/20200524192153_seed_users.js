exports.up = function (knex) {
	return knex('user').insert([
		{
			first_name: 'Bob',
			last_name: 'Smith',
			email: 'Bob@smith.comm',
			username: 'bsmith',
			password: 'password',
		},
		{
			first_name: 'Mary',
			last_name: 'Jones',
			email: 'mary@jones.comm',
			username: 'mjones',
			password: 'password',
		},
	]);
};

exports.down = function (knex) {
	return knex('user')
		.where('email', 'Bob@smith.comm')
		.orWhere('email', 'mary@jones.comm')
		.del();
};
