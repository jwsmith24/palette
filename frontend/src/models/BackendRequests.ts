import { Rubric } from './types/rubric.ts';

// define the backed endpoints
const backendBaseURL: string = 'http://localhost:3000/api';
const BAD_REQUEST = 400;

// function to send rubric to the server
export async function postRubric(rubric: Rubric) {
  try {
    const res = await fetch(`${backendBaseURL}/rubrics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rubric),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Rubric saved!', data);
    } else {
      const errorResult = await res.json();
      if (res.status === BAD_REQUEST) {
        // Display validation errors
        const errors = errorResult.errors;
        errors.forEach((error: { param: any; msg: any }) => {
          console.log(`Field: ${error.param}, Message: ${error.msg}`);
        });
      } else {
        // Handle other errors
        console.error('An error occurred:', errorResult.error);
      }
    }
  } catch (error) {
    console.error(error); // update error message with more deets
  }
}

// function to update rubric on the server
export async function updateRubricWithID(id: number, rubric: Rubric) {
  try {
    const res = await fetch(`${backendBaseURL}/rubrics/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rubric),
    });

    if (res.ok) {
      // Check if the response is 204 (no content)
      if (res.status === 204) {
        console.log('Rubric updated successfully!');
        return true;
      }
      const data = await res.json();
      console.log('Rubric updated!', data);
      return data;
    } else {
      const errorResult = await res.json();
      if (res.status === BAD_REQUEST) {
        const errors = errorResult.errors;
        errors.forEach((error: { param: any; msg: any }) => {
          console.log(`Field: ${error.param}, Message: ${error.msg}`);
        });
      } else {
        console.error('An error occurred:', errorResult.error);
      }
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// function to check if a rubric already exists with this title and if so returns true and the id of the rubric
export async function rubricWithTitleExists(title: string): Promise<{
  exists: boolean;
  id: number;
}> {
  try {
    const res = await fetch(`${backendBaseURL}/rubrics/title/${title}`, {
      headers: {
        'Cache-control': 'no-cache',
      },
    });
    if (res.ok) {
      const data = await res.json();
      return { exists: true, id: data.id }; // rubric with this title exists
    } else {
      const errorResult = await res.json();
      if (res.status === BAD_REQUEST) {
        // Display validation errors
        const errors = errorResult.errors;
        errors.forEach((error: { param: any; msg: any }) => {
          console.log(`Field: ${error.param}, Message: ${error.msg}`);
        });
      } else {
        // Handle other errors
        console.error('An error occurred:', errorResult.error);
      }
    }
  } catch (error) {
    console.error(error); // update error message with more deets
  }
  return { exists: false, id: -1 }; // rubric with this title does not exist
}

// function to delete a rubric by id
export async function deleteRubricWithID(id: number) {
  try {
    const res = await fetch(`${backendBaseURL}/rubrics/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      console.log('Rubric deleted!');
    } else {
      const errorResult = await res.json();
      if (res.status === BAD_REQUEST) {
        // Display validation errors
        const errors = errorResult.errors;
        errors.forEach((error: { param: any; msg: any }) => {
          console.log(`Field: ${error.param}, Message: ${error.msg}`);
        });
      } else {
        // Handle other errors
        console.error('An error occurred:', errorResult.error);
      }
    }
  } catch (error) {
    console.error(error); // update error message with more deets
  }
}
