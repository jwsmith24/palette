import React, { useEffect, useState } from 'react';

const CanvasCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace this with your actual Canvas API token
  const token = ''; 
  const domain = 'https://canvas.asu.edu';
  const corsProxy = 'https://cors-anywhere.herokuapp.com/';

const fetchCourses = async () => {
    try {
      const response = await fetch(`${corsProxy}${domain}/api/v1/courses`, {
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
      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name} (Code: {course.course_code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CanvasCourses;