/* eslint-disable no-unused-vars */
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
      
      Swal.hideLoading();
      onHide()
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
        <Form className='modalUpdateProductForm' onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group >
                    <label className='labelForm'>Nama Motor</label>
                      <Form.Control className='modalUpdateProductControl' name="namaMotor" onChange={handleChange} type="text" placeholder="Nama Motor" required/>
                    </Form.Group>

                    <Form.Group  >
                      <label className='labelForm'>Harga Beli</label>
                      <Form.Control className='modalUpdateProductControl' name="hargaBeli" onChange={handleChange} type="number" placeholder="contoh : 42.6 jt"  required/>
                    </Form.Group>

                    <Form.Group  >
                      <label className='labelForm'>Harga Jual</label>
                      <Form.Control className='modalUpdateProductControl' name="hargaJual" onChange={handleChange} type="number" placeholder="contoh : 54.3 jt"  required/>
                    </Form.Group>

                    <Form.Group  >
                    <label className='labelForm'>Stok Motor</label>
                      <Form.Control className='modalUpdateProductControl' name="stok" onChange={handleChange} type="number" placeholder="contoh : 5"  required/>
                    </Form.Group>

                    <Form.Group >
                      <label className='labelForm'>Pilih image, size max 100kb (jpg, png)</label>
                      <Form.Control className='modalUpdateProductImage' name="image" onChange={handleChange} type="file" accept=".jpg, .png" required/>
                    </Form.Group>

          <button className='modalNewProductButton'>Tambah Product</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewProduct;
