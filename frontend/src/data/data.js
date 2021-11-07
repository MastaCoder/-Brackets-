// this is just a very raw version of what data is, it will not exist in phase 2
// this will be replaced with a database and API calls in phase 2

// user is the username of the current user logged in
const data = {
	tournaments: [
		{
			// user in this event, hasn't started yet
			id: 1,
			name: 'CSSU Games Night - League of Legends',
			description:
				'Join us for the CSSU game night, featuring League of Legends! We run this event weekly with' +
				'registration done at the front office room BA1010',
			public: true,
			maxMembers: 20,
			members: ['user', 'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'friend'],
			teams: {
				g1: ['u1', 'u2'],
				g2: ['u3', 'u4'],
				g3: ['u5', 'u6'],
				g4: ['user', 'friend']
			},
			maxTeamMembers: 2,
			status: 0,
			host: 'randomuser',
			userTeam: 'g4'
		},
		{
			// user in this event, started
			id: 2,
			name: 'PUBG Mobile Tournament',
			description:
				'This is the galaxy games PUBG mobile tournament, searching for the winner of the $25,000 grand ' +
				'prize.',
			public: true,
			maxMembers: 17,
			members: [
				'u1',
				'u2',
				'u3',
				'u4',
				'u5',
				'u6',
				'u7',
				'u8',
				'u9',
				'u10',
				'u11',
				'u12',
				'u13',
				'u14',
				'u15',
				'u16',
				'user',
			],
			teams: {
				g1: ['u1', 'u2'],
				g2: ['u3', 'u4'],
				g3: ['u5', 'u6'],
				g4: ['u7', 'u8'],
				g5: ['u9'],
				g6: ['u10'],
				g7: ['u11', 'u12'],
				g8: ['u13', 'u14'],
				g9: ['u15', 'u16'],
				'me group': ['user'],
			},
			maxTeamMembers: 2,
			status: 1,
			host: 'randomuser',
			userTeam: 'me group'
		},
		{
			// user in this event, ended
			id: 3,
			name: 'Random Tourny APEX Legends',
			description: 'The boys played this for fun.',
			public: false,
			maxMembers: 4,
			members: ['user', 'u1', 'u2', 'u3'],
			teams: {
				g1: ['u1'],
				edfgdfg: ['u2'],
				something: ['u3'],
				'big fat team': ['user'],
			},
			maxTeamMembers: 1,
			status: 2,
			host: 'randomuser',
			userTeam: "big fat team"
		},
		{
			// user not in this event, hasn't started yet
			id: 4,
			name: 'CSC309 Minecraft Hunger Games',
			description:
				'Person to end this game as the winner will receive a 100% in the course, so just keep that in ' +
				"mind when playing to ensure you're the one that ends up getting the grade. I'm just typing now to see if " +
				'I can reach the max description length.',
			public: true,
			maxMembers: 50,
			members: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10'],
			teams: {
				t1: ['u1', 'u2', 'u3'],
				t2: ['u4', 'u5', 'u6'],
				t3: ['u8', 'u7'],
				t4: ['u9'],
				t5: ['u10'],
			},
			maxTeamMembers: 3,
			status: 0,
			host: 'randomuser',
			userTeam: null
		},
		{
			// user not in this event, hasn't started yet
			id: 5,
			name: 'Random Mini-Game (Crab Game)',
			description:
				'We are playing crab game, view full details at discord.gg/invitelink.',
			public: true,
			maxMembers: 5,
			members: ['u1', 'u2', 'u3', 'u4', 'u5'],
			teams: {
				t1: ['u1'],
				t2: ['u2'],
				t3: ['u3'],
				t4: ['u4'],
				t5: ['u5'],
			},
			maxTeamMembers: 1,
			status: 1,
			host: 'randomuser',
			userTeam: null
		},
		{
			// user not in this event, not started
			id: 6,
			name: "Random event I've created",
			description: 'Just a random filler event to test user event creation.',
			public: true,
			maxMembers: 100,
			members: [],
			teams: {},
			maxTeamMembers: 5,
			status: 0,
			host: 'user',
		},
		{
			// user not in this event, ended
			id: 6,
			name: "Random event I've created 2!",
			description: 'Just a random filler event to test user event creation.',
			public: true,
			maxMembers: 420,
			members: [],
			teams: {},
			maxTeamMembers: 10,
			status: 2,
			host: 'user',
			userTeam: null
		},
	],
  players: [
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
    {
      type: 'user',
      id: 6,
      name: 'user',
      email: 'user@user.com',
      isBanned: false
    }
  ],
  admins: [
    {
      type: 'admin',
      id: 7,
      name: 'admin',
      email: 'admin@admin.com',
      isBanned: false
    }
  ]
};

export default data;
