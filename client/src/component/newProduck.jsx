import React from 'react';
import { Modal, Form} from "react-bootstrap";

function NewProduck({show, onHide}) {
    return(
        <Modal show={show} onHide={onHide}>  
            <Modal.Body className='modalLoginBody'>
                <Modal.Title className='modalLoginTitle'>Tambah Produck</Modal.Title>
                <Form className='modalLoginForm'>
                    <Form.Group className="mb-3" >
                    <Form.Control className='modalLoginControl' name="namaMotor" type="text" placeholder="Nama Motor" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' name="informasiMotor" type="text" placeholder="Informasi Motor" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' name="hargaBeli" type="text" placeholder="Harga Beli" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' name="hargaJual" type="text" placeholder="Harga Jual" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' name="stokMotor" type="text" placeholder="Stok Motor" />
                    </Form.Group>

                    <div className='modalLoginButton' type="submit">Tambah Produck</div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default NewProduck