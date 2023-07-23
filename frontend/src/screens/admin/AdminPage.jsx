import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const AdminPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/admin/userstable');
       
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  });

  return (
    <div>
      <h2>User Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
