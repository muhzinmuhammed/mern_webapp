import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [image, setImage] = useState(null); // Change to null initially
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const dispatch=useDispatch()

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setImage(null); // Set to null initially, so we don't use URL.createObjectURL
  }, [userInfo]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the actual File object in the state
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("repassword", repassword);
        if (image) {
          formData.append("image", image);
        }

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ ...userInfo, name, email }));
        

        // dispatch(setCredentials({ ...res }));

        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <img
          alt="Profile Picture"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        />

        <Form.Group controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload photo"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="repassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary">
          Update Profile
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
