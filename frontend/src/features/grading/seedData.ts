import { Submission } from "palette-types";

export const dummyGroups = [
  "Galaxy Explorers",
  "Nebula Navigators",
  "Comet Chasers",
  "Stellar Pioneers",
  "Asteroid Adventurers",
  "Cosmic Voyagers",
  "Lunar Legends",
  "Orbit Operators",
  "Supernova Squad",
  "Solar Seekers",
  "Planet Patrol",
  "Starbase Strikers",
  "Meteor Mavericks",
  "Black Hole Bandits",
  "Rocket Rangers",
  "Astral Alliance",
];

export const dummySubmissions: Submission[] = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Neil Armstrong",
      asurite: "narmstrong",
    },
    group: {
      id: 201,
      name: "Apollo 11",
    },
    comments: [
      {
        id: 1,
        authorName: "Buzz Aldrin",
        comment: "Great work on the moon landing analysis!",
      },
      {
        id: 2,
        authorName: "Michael Collins",
        comment: "Added some orbital mechanics insights.",
      },
    ],
    rubricAssessment: [],
    graded: true,
    gradedBy: 301, // grader ID
    late: false,
    missing: false,
    attachments: [
      {
        fileName: "moon_landing_report.pdf",
        url: "https://example.com/moon_landing_report.pdf",
      },
    ],
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Sally Ride",
      asurite: "sride",
    },
    group: {
      id: 202,
      name: "Challenger Crew",
    },
    comments: [
      {
        id: 3,
        authorName: "John Glenn",
        comment: "Added observations from the Mercury missions.",
      },
    ],
    rubricAssessment: [],
    graded: false,
    gradedBy: 0, // not graded yet
    late: true,
    missing: false,
    attachments: [
      {
        fileName: "challenger_data_analysis.xlsx",
        url: "https://example.com/challenger_data_analysis.xlsx",
      },
    ],
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Yuri Gagarin",
      asurite: "ygagarin",
    },
    group: undefined, // no group
    comments: [],
    rubricAssessment: [],
    graded: false,
    gradedBy: 0, // not graded yet
    late: false,
    missing: true,
    attachments: [],
  },
  {
    id: 4,
    user: {
      id: 104,
      name: "Mae Jemison",
      asurite: "mjemison",
    },
    group: {
      id: 203,
      name: "Endeavour Crew",
    },
    comments: [
      {
        id: 4,
        authorName: "Buzz Aldrin",
        comment: "Love the focus on sustainable space travel!",
      },
    ],
    rubricAssessment: [],
    graded: true,
    gradedBy: 302,
    late: false,
    missing: false,
    attachments: [
      {
        fileName: "endeavour_project_plan.docx",
        url: "https://example.com/endeavour_project_plan.docx",
      },
    ],
  },
];
