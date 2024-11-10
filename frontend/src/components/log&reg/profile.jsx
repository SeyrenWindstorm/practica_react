import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8018/apiL/login', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleHome = () => window.location.href = '/home';
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Card className="shadow p-4 bg-white rounded">
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text>
          <strong>Username:</strong> {userData.username}
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> {userData.email}
        </Card.Text>
        <Button variant="primary" onClick={handleHome}>
          Go to Home
        </Button>
        <Button variant="secondary" onClick={handleLogout} className="ml-2">
          Logout
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Profile;