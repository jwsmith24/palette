# Palette Docs

## Update an Assignment Rubric Workflow

_A guide to navigate the wonderous Canvas API._

### Phase 1: Establish Context

- Ensure that `activeCourse`, `activeAssignment` are set to the intended targets.
    - These values are consistent across the application utilizing the React `ContextProvider` wrapper.
    - [React docs on Context](https://react.dev/reference/react/useContext)
- This ensures `course_id`, `assignment_id`, and `rubric_id` are known and valid prior to building the request.

### Phase 2: Edit Rubric

- The user will either edit an existing rubric or create a new one.
- This phase ends when the user clicks `Save Rubric` and all form inputs are valid.

### Phase 3A: Add Updated Rubric to Canvas

- If Assignment already has an existing rubric:
    - Send a PUT request to update the rubric with the latest data to the endpoint:
        - `https://canvas.asu.edu/api/v1/courses/:course_id/rubrics/:rubric_id`
    - The payload must follow the example format below:

```json
  {
  "rubric_association": {
    "association_type": "Assignment",
    "association_id": 5736216,
    "use_for_grading": true,
    "purpose": "grading"
  },
  "rubric": {
    "title": "Updated Rubric",
    "criteria": {
      "1": {
        "description": "wonderful new criterion",
        "ratings": {
          "1": {
            "description": "very very good",
            "points": 5.0
          },
          "2": {
            "description": "not quite there",
            "points": 1.0
          }
        }
      },
      "2": {
        "description": "another criterion",
        "ratings": {
          "1": {
            "description": "absolutely unbelievable",
            "points": 100.0
          },
          "2": {
            "description": "quite shocked",
            "points": 10
          }
        }
      }
    }
  }
}
```

### Phase 3B: Add Rubric to Assignment Without an Existing Rubric

- Create new rubric in the course with a POST request matching the format below.
-

POST Request Format:

```json
{
  "rubric_association": {
    "association_type": "Assignment",
    "association_id": 5736216,
    "use_for_grading": true,
    "purpose": "grading"
  },
  "rubric": {
    "public": true,
    "title": "rubric MADE IN REAL TIME RIGHT NOW!",
    "criteria": {
      "1": {
        "description": "wonderful new criterion",
        "ratings": {
          "1": {
            "description": "very very good",
            "points": 899.0
          },
          "2": {
            "description": "not quite there",
            "points": 1.0
          }
        }
      },
      "2": {
        "description": "holy cow we're doing it!",
        "ratings": {
          "1": {
            "description": "absolutely unbelievable",
            "points": 100.0
          },
          "2": {
            "description": "quite shocked",
            "points": 10
          }
        }
      }
    }
  }
}
```


