import React from 'react';
import { Modal, Form} from "react-bootstrap";

function ModalRegister() {
    return(
        <Modal show={false}>
            <Modal.Body className='modalRegisterBody'>
            <Modal.Title className='modalRegisterTitle' >Register</Modal.Title>
            <Form style={{ width: '416px', margin:'auto'}}>
                <Form.Group className="mb-3" >
                <Form.Control className='modalRegisterControl' name="email" type="text" placeholder="Email"  required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Control className='modalRegisterControl' name="password" type="password" placeholder="password"  required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Control className='modalRegisterControl'  name="fullName" type="text" placeholder="Full Name"  required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Control className='modalRegisterControl' name="phone" type="text" placeholder="Phone"  required/>
                </Form.Group>

                <div className='modalRegisterButton' type="submit">Register</div>

                <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
                <button className='modalRegisterButtonHere'>Here</button>
                </div>
                
            </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalRegister