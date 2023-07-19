import React from 'react';
import { Modal, Form} from "react-bootstrap";

function ModalRegister({show, onHide, hereLogin}) {
    return(
        <Modal show={show} onHide={onHide}>
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

                <div className='modalRegisterButton' type="submit">Register</div>

                <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
                <button className='modalRegisterButtonHere' onClick={hereLogin}>Here</button>
                </div>
                
            </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalRegister