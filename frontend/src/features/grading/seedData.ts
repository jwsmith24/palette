// Define a mock `Criteria` for rubricAssessment
import { Criteria, GroupedSubmissions, Submission } from "palette-types";

const mockCriteria: Criteria[] = [
  {
    id: 1,
    description: "Quality of Code",
    points: 5,
    longDescription: "",
    ratings: [],
    key: "",
    updatePoints: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  {
    id: 2,
    description: "Documentation",
    points: 3,
    longDescription: "",
    ratings: [],
    key: "",
    updatePoints: function (): void {
      throw new Error("Function not implemented.");
    },
  },
];

// Define dummy submissions
export const dummySubmissions: Submission[] = [
  {
    id: 1,
    user: { id: 101, name: "Alice Johnson", asurite: "alicej" },
    group: { id: 1, name: "Team Alpha" },
    comments: [
      {
        id: 201,
        authorName: "Alice Johnson",
        comment: "This is my submission.",
      },
    ],
    rubricAssessment: mockCriteria,
    graded: true,
    gradedBy: 301,
    late: false,
    missing: false,
    attachments: [
      {
        filename: "assignment1.pdf",
        url: "https://example.com/assignment1.pdf",
      },
    ],
  },
  {
    id: 2,
    user: { id: 102, name: "Bob Smith", asurite: "bobsmith" },
    group: { id: 2, name: "Team Bravo" },
    comments: [
      { id: 202, authorName: "Bob Smith", comment: "Submitted on time." },
    ],
    rubricAssessment: mockCriteria,
    graded: false,
    gradedBy: 0,
    late: true,
    missing: false,
    attachments: [
      {
        filename: "assignment1-late.pdf",
        url: "https://example.com/assignment1-late.pdf",
      },
    ],
  },
  {
    id: 3,
    user: { id: 103, name: "Charlie Brown", asurite: "charlieb" },
    comments: [],
    rubricAssessment: mockCriteria,
    graded: false,
    gradedBy: 0,
    missing: true,
  },
];

// Define grouped submissions
const groupedSubmissions: GroupedSubmissions = {
  1: [
    dummySubmissions[0], // Alice's submission
  ],
  2: [dummySubmissions[1]],
  "no-group": [
    dummySubmissions[2], // Charlie's submission
  ],
};

console.log(groupedSubmissions);
