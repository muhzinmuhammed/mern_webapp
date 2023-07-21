import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Row,Form,Button,Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch,useSelector } from "react-redux";
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from "../components/Loader";

const RegisterScreen = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [repassword,setRePassword]=useState('')

    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>
        Sign In
      </h1>
      
      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="name">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="text"placeholder="enter name"value={name}
            onChange={(e)=>setName(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control type="email"placeholder="enter email"value={email}
            onChange={(e)=>setEmail(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"placeholder="enter password"value={password}
            onChange={(e)=>setPassword(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password"placeholder="enter password"value={repassword}
            onChange={(e)=>setRePassword(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Button type="submit"variant="primary"className="mt-3">SignIN</Button>
        <Row className="py-3">
            <Col>
          Already account? <Link to={'/login'}>Login</Link>
            </Col>
        </Row>
        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
