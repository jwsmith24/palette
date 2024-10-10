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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace these with your actual Canvas API details
  const token = ''; // Replace with your actual access token
  const domain = 'https://canvas.asu.edu';
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  const courseId = 15760; //Course ID found in URL

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

  useEffect(() => {
    fetchCourse();
  }, []);

  if (loading) {
    return <div>Loading course...</div>;
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
    </div>
  );
};


export default CanvasCourses;