/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import { Modal, Form, Alert} from "react-bootstrap";
import {API} from '../../config/Api';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';

function ModalRegister({show, onHide, hereLogin}) {
    const [message, setMessage] = useState(false);
    const [formRegister, setFormRegister] = useState({
        email: '',
        password: '',
        fullName: '',
      });
      
        const handleChange = (e) => {
          setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value,
          });
        };
      
        const handleSubmit = useMutation(async (e) => {
          try {
            e.preventDefault();
            
            const config = {
              headers: {
                'Content-type': 'multipart/form-data',
              },
            };
      
            const formData = new FormData();
            formData.set('email', formRegister.email);
            formData.set('password', formRegister.password);
            formData.set('fullName', formRegister.fullName);
      
            const response = await API.post('/register', formData, config);

            onHide()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Berhasil Register',
                showConfirmButton: false,
                timer: 3000
              })
          } catch (error) {
            const alert = (
              <Alert variant="danger" className="py-1">
                Failed to register!
              </Alert>
            );
            setMessage(alert);
            console.log("register failed : ", error);
          }
        });


        const handleCloseModal = () => {
            setMessage(false);
            onHide();
        };

    return(
        <Modal show={show} onHide={handleCloseModal} onSubmit={(e) => handleSubmit.mutate(e)}>
            <Modal.Body className='modalRegisterBody'>
            <Modal.Title className='modalRegisterTitle' >Register</Modal.Title>
            {message && message}
            <Form style={{ width: '416px', margin:'auto'}}>
                <Form.Group className="mb-3" >
                <Form.Control className='modalRegisterControl' name="email" type="email" onChange={handleChange} placeholder="Email"  required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Control className='modalRegisterControl' name="password" type="password" onChange={handleChange} placeholder="password"  required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Control className='modalRegisterControl'  name="fullName" type="text" onChange={handleChange} placeholder="Full Name"  required/>
                </Form.Group>

                <button className='modalRegisterButton' type="submit">Register</button>

                <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
                <button className='modalRegisterButtonHere' onClick={hereLogin}>Here</button>
                </div>
                
            </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalRegister