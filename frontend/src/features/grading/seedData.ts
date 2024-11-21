export const dummyGroupedSubmissions = {
  Apollo: [
    {
      id: 1,
      user: {
        asurite: "astronaut1",
        name: "Commander A",
      },
      graded: true,
      missing: true,
      late: false,
      comments: false,
      attachments: null,
    },
    {
      id: 2,
      user: {
        asurite: "astronaut2",
        name: "Commander B",
      },
      graded: true,
      missing: true,
      late: false,
      comments: true,
      attachments: null,
    },
    {
      id: 3,
      user: {
        asurite: "astronaut3",
        name: "Commander C",
      },
      graded: false,
      missing: false,
      late: true,
      comments: true,
      attachments: ["mission_log3.pdf"],
    },
  ],
  Orion: [
    {
      id: 4,
      user: {
        asurite: "astronaut4",
        name: "Commander D",
      },
      graded: true,
      missing: false,
      late: false,
      comments: true,
      attachments: ["mission_log4.pdf"],
    },
    {
      id: 5,
      user: {
        asurite: "astronaut5",
        name: "Commander E",
      },
      graded: true,
      missing: true,
      late: true,
      comments: true,
      attachments: ["mission_log5.pdf"],
    },
    {
      id: 6,
      user: {
        asurite: "astronaut6",
        name: "Commander F",
      },
      graded: true,
      missing: false,
      late: true,
      comments: false,
      attachments: ["mission_log6.pdf"],
    },
    {
      id: 7,
      user: {
        asurite: "astronaut7",
        name: "Commander G",
      },
      graded: false,
      missing: false,
      late: true,
      comments: true,
      attachments: null,
    },
  ],
  unassigned: [
    {
      id: 8,
      user: {
        asurite: "astronaut8",
        name: "Commander H",
      },
      graded: true,
      missing: true,
      late: true,
      comments: true,
      attachments: null,
    },
    {
      id: 9,
      user: {
        asurite: "astronaut9",
        name: "Commander I",
      },
      graded: true,
      missing: true,
      late: true,
      comments: true,
      attachments: ["mission_log9.pdf"],
    },
    {
      id: 10,
      user: {
        asurite: "astronaut10",
        name: "Commander J",
      },
      graded: true,
      missing: true,
      late: true,
      comments: false,
      attachments: ["mission_log10.pdf"],
    },
  ],
};
