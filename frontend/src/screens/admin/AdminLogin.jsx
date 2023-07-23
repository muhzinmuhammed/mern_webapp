import  { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

import {Form,Button,Row,Col} from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'

import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../adminSlice/adminApislice'
import { setCredentials } from '../../adminSlice/authSkice'


const AdminLogin=()=> {
    const [login]=useLoginMutation()
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
const dispatch=useDispatch()
    const navigate=useNavigate()

    const submitHandler=async (e)=>{
        e.preventDefault()
        try {
            const res = await login({email,password}).unwrap()
           
            dispatch(setCredentials({...res}))
            
            navigate('/admin')
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
       
    

    }   

    

    

    
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control   
                type='email'
                placeholder='Enter valid email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control   
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

           <Button type='submit' variant='primary' className='mt-3'>
                Sign In
           </Button>
           <Row className='py-3'>
            <Col>
                New Customer? <Link to='/register'>Register</Link>
            </Col>
           </Row>
        </Form>
    </FormContainer>
  )
}

export default AdminLogin