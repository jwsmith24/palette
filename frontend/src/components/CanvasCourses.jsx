/*
Currently have to go to the console and accept creating a temporary 
demo server that will allow you to bypass CORS policy

To create your own token go to your personal canvas and 
go to Account then settings.  Scroll down till you see an 
Approved Integrations and create your own token to access 
your account information.
*/
import React, { useEffect, useState } from 'react';

const CanvasCourses = () => {
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace these with your actual Canvas API details
  const token = ''; 
  const domain = 'https://canvas.asu.edu';
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const courseId = 15760; //Course ID found in URL

  // Fetch course details
  const fetchCourse = async () => {
    try {
      const response = await fetch(`${corsProxy}${domain}/api/v1/courses/${courseId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCourse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all assignments for the specified course
  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${corsProxy}${domain}/api/v1/courses/${courseId}/assignments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchAssignments(); // Fetch assignments after fetching course details
  }, []);

  if (loading) {
    return <div>Loading course and assignments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Course Details</h1>
      {course ? (
        <div>
          <p>ID: {course.id}</p>
          <p>Name: {course.name}</p>
          <p>Code: {course.course_code}</p>
        </div>
      ) : (
        <p>No course found.</p>
      )}

      <h2>Assignments</h2>
      {assignments.length > 0 ? (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <strong>{assignment.name}</strong>: {assignment.description || "No description provided"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments found for this course.</p>
      )}
    </div>
  );
};

export default CanvasCourses;
