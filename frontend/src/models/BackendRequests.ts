import {Rubric} from "./types/rubric.ts";

// define the backed endpoints
const backendBaseURL: string= "http://localhost:3000/api";
const BAD_REQUEST = 400;

// function to send rubric to the server
export async function postRubric(rubric: Rubric) {
    try {
        const res = await fetch(`${backendBaseURL}/rubrics`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rubric),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("Rubric saved!", data);
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
                console.error("An error occurred:", errorResult.error);
            }
        }
    } catch (error) {
        console.error(error); // update error message with more deets
    }
}

// function to update rubric on the server
export async function updateRubric(rubric: Rubric) {
    try {
        const res = await fetch(`${backendBaseURL}/rubrics/${rubric.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rubric),
        })

        if (res.ok) {
            const data = await res.json();
            console.log("Rubric updated!", data);
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
                console.error("An error occurred:", errorResult.error);
            }
        }
    } catch (error) {
        console.error(error); // update error message with more deets
    }
}


// function to check if this rubric already exists (by title)
export async function rubricWithTitleExists(title: string): Promise<boolean> {
    try {
        // fetch the first rubric with the given title
        const res = await fetch(`${backendBaseURL}/${title}`);
        if (res.ok) {
            // if the backend doesn't return a 404, the rubric exists
            console.log("Rubric with title exists");
            return true;
        } else {
            console.log(res.status);
            return false;
        }
    } catch (error) {
        console.error(error); // update error message with more deets
        return false;
    }
}

