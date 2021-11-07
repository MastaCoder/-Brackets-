
const allPlayers = [
	{
		type: 'user',
		id: 1,
		name: 'im_too_sexy',
		email: 'waytoosexy@mail.com',
		isBanned: false,
	},
	{
		type: 'user',
		id: 2,
		name: 'im_tooo_sexy',
		email: 'waytoosexy@mail.com',
		isBanned: false,
	},
	{
		type: 'user',
		id: 3,
		name: 'im_tooo_sexy',
		email: 'waytoosexy@mail.com',
		isBanned: false,
	},
	{
		type: 'user',
		id: 4,
		name: 'ayo_pierre',
		email: 'pierre@mail.com',
		isBanned: true,
	},
	{
		type: 'user',
		id: 5,
		name: 'damnBoi1782',
		email: 'dammit@mail.com',
		isBanned: false,
	},
];

const data = {
    userLogs: [{user: "danny1337", action: "Tournament Create", date: Date().toLocaleString()}],
    users: allPlayers,
    attendingTournaments: [],
    hostingTournaments: [],
}

export default data;