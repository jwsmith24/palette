//CORS issue fetching API calls working on it 
//Works with cURL commands to call API 
/*

curl -H "Authorization: Bearer YOUR_TOKEN"\
     -H "Content-Type: application/json" \
     "https://canvas.asu.edu/api/v1/courses"
*/


import React, { useEffect, useState } from 'react';
const CanvasCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace these with your actual Canvas API details
  const token = ''; // Make sure to use your actual access token
  const domain = 'https://canvas.asu.edu'; 

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${domain}/api/v1/courses`, {
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
