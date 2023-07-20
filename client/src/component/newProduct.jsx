import { React, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../config/Api';

function NewProduct({ show, onHide }) {
  const [formProduct, setFormProduct] = useState({
    namaMotor: '',
    hargaBeli: '',
    hargaJual: '',
    stok: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormProduct({
      ...formProduct,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
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
      formData.set('namaMotor', formProduct.namaMotor);
      formData.set('hargaBeli', formProduct.hargaBeli);
      formData.set('hargaJual', formProduct.hargaJual);
      formData.set('stok', formProduct.stok);
      formData.append('image', formProduct.image[0], formProduct.image[0].name);

      const response = await API.post('/product', formData, config);
      console.log("add product success : ", response);
      console.log("data : ", formData);

    } catch (error) {
      console.log("add product failed : ", error);
    }
  });

  console.log("ini data Produck", formProduct);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className='modalLoginBody'>
        <Modal.Title className='modalLoginTitle'>Tambah Product</Modal.Title>
        <Form className='modalLoginForm' onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" >
            <Form.Control className='modalLoginControl' name="namaMotor" onChange={handleChange} type="text" placeholder="Nama Motor" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control className='modalLoginControl' name="hargaBeli" onChange={handleChange} type="text" placeholder="Harga Beli" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control className='modalLoginControl' name="hargaJual" onChange={handleChange} type="text" placeholder="Harga Jual" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control className='modalLoginControl' name="stok" onChange={handleChange} type="text" placeholder="Stok Motor" />
          </Form.Group>

          <Form.Group className="mb-3">
            <label>Pilih image</label>
            <Form.Control className='modalLoginControl' name="image" onChange={handleChange} type="file" />
          </Form.Group>

          <button className='modalLoginButton'>Tambah Product</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewProduct;
