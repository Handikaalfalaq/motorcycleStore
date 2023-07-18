import React from 'react';
import { Modal, Form} from "react-bootstrap";

function ModalLogin({show, onHide, hereRegister}) {
    return(
        <Modal show={show} onHide={onHide}>  
            <Modal.Body className='modalLoginBody'>
                <Modal.Title className='modalLoginTitle'>Login</Modal.Title>
                <Form className='modalLoginForm'>
                    <Form.Group className="mb-3" >
                    <Form.Control className='modalLoginControl' name="email" type="text" placeholder="Email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Control className='modalLoginControl' name="password"  type="password" placeholder="password" />
                    </Form.Group>

                    <div className='modalLoginButton' type="submit">Login</div>

                    <div style={{textAlign:'center', fontWeight:'500'}}>Don't have an account ? klik
                    <button className='modalLoginButtonHere' onClick={hereRegister}>Here</button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ModalLogin