import { React, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../config/Api';
import Swal from 'sweetalert2';

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

      if (formProduct.image[0] && formProduct.image[0].size > 100 * 1024) {
        alert('Ukuran file gambar tidak boleh lebih dari 100 KB.');
        return;
      }
  
      formData.append('image', formProduct.image[0], formProduct.image[0].name);
  
      Swal.showLoading();

      const response = await API.post('/product', formData, config);
      console.log("add product success : ", response);
      console.log("data : ", formData);
      
      Swal.hideLoading();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product Baru Berhasil Ditambahkan',
        showConfirmButton: false,
        timer: 3000
      }).then(() => {
        window.location.reload();
      });

    } catch (error) {
      console.log("add product failed : ", error);
    }
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className='modalNewProductBody'>
        <Modal.Title className='modalNewProductTitle'>Tambah Product</Modal.Title>
        <Form className='modalNewProductForm' onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" >
            <Form.Control className='modalNewProductControl' name="namaMotor" onChange={handleChange} type="text" placeholder="Nama Motor" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control className='modalNewProductControl' name="hargaBeli" onChange={handleChange} type="number" placeholder="Harga Beli ('42.6 jt')" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control className='modalNewProductControl' name="hargaJual" onChange={handleChange} type="number" placeholder="Harga Jual ('54.3 jt')" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control className='modalNewProductControl' name="stok" onChange={handleChange} type="number" placeholder="Stok Motor" />
          </Form.Group>

          <Form.Group className="mb-3">
            <label>Pilih image, size max 100kb (jpg, png)</label>
            <Form.Control className='modalNewProductControl' name="image" onChange={handleChange} type="file" accept=".jpg, .png" />
          </Form.Group>

          <button className='modalNewProductButton'>Tambah Product</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewProduct;
