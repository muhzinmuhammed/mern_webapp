import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const deleteUser = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this user?');

    if (shouldDelete) {
      try {
        await axios.delete(`/api/admin/delete_user/${id}`);
        setUserData((prevUserData) => prevUserData.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
  }, []);

  // Filter user data based on the search query
  const filteredUserData = userData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>User Table</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary">Search</Button>
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserData.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
