import {
    RubricAssociationPurpose,
    RubricAssociationType,
    Rubric,
    RubricAssociation,
    RubricCriterion
} from "./Rubric";

import * as RubricAPI from "./RubricAPI";
import {CreateRubricRequest} from "./RubricAPI";

// create a dummy rubric object
// const rubric: Rubric = {
//     id: 1,
//     title: "Rubric Title",
//     context_id: 1,
//     context_type: "Course",
//     points_possible: 10,
//     reusable: false,
//     read_only: false,
//     free_form_criterion_comments: false,
//     hide_score_total: false,
//     data: null,
//     assessments: null,
//     associations: null
// };

const req: CreateRubricRequest = {
    id: 1,
    rubric_association_id: 1,
    rubric: {
        title: "Rubric Title",
        free_form_criterion_comments: false,
        criteria: {}
    },
    rubric_association: {
        association_id: 1,
        association_type: "Course",
        use_for_grading: false,
        hide_score_total: false,
        purpose: "grading"
    }
};


let res = RubricAPI.createSingleRubric(15760, req);
console.log(res);