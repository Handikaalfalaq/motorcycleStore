/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from 'react';
import { Modal, Form} from "react-bootstrap";
import { useMutation } from 'react-query';
import { API } from '../config/Api';
import Swal from 'sweetalert2';

function UpdateProduct({show, onHide, idProduct }) {
  const [formUpdateProduct, setFormUpdateProduct] = useState({
      namaMotor: '',
      hargaBeli: '',
      hargaJual: '',
      stok: '',
      image: '',
    })

    useEffect(() => {
      if (idProduct) {
        const fetchData = async () => {
          try {
            const response = await API.get(`/product/${idProduct}`);
            const dataProductById = response.data.data;
            setFormUpdateProduct({
              namaMotor: dataProductById.namaMotor,
              hargaBeli: dataProductById.hargaBeli,
              hargaJual: dataProductById.hargaJual,
              stok: dataProductById.stok,
              image: dataProductById.image,
            });
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }
    }, [idProduct]);
    

    const handleChange = (e) => {
      setFormUpdateProduct({
          ...formUpdateProduct,
          [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value,
        })
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
          formData.set('namaMotor', formUpdateProduct.namaMotor);
          formData.set('hargaBeli', formUpdateProduct.hargaBeli);
          formData.set('hargaJual', formUpdateProduct.hargaJual);
          formData.set('stok', formUpdateProduct.stok);
          if (formUpdateProduct.image[0] && formUpdateProduct.image[0].size > 100 * 1024) {
            alert('Ukuran file gambar tidak boleh lebih dari 100 KB.');
            return;
          }
      
          formData.append('image', formUpdateProduct.image[0], formUpdateProduct.image[0].name);
    
          Swal.showLoading();
    
          const response = await API.patch(`/product/${idProduct}`, formData, config);
          
          Swal.hideLoading();
          onHide()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil Update Data Product',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.reload();
          });
    
        } catch (error) {
          console.log("add product failed : ", error);
        }
      });

    return(
        <Modal show={show} onHide={onHide}>  
            <Modal.Body className='modalUpdateProductBody'>
                <Modal.Title className='modalUpdateProductTitle'>Update Product</Modal.Title>
                <Form className='modalUpdateProductForm' onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group >
                    <label className='labelForm'>Nama Motor</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.namaMotor} name="namaMotor" onChange={handleChange} type="text" placeholder="Nama Motor" required/>
                    </Form.Group>

                    <Form.Group  >
                      <label className='labelForm'>Harga Beli</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.hargaBeli} name="hargaBeli" onChange={handleChange} type="number" placeholder="contoh : 42.6 jt"  required/>
                    </Form.Group>

                    <Form.Group  >
                      <label className='labelForm'>Harga Jual</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.hargaJual} name="hargaJual" onChange={handleChange} type="number" placeholder="contoh : 54.3 jt"  required/>
                    </Form.Group>

                    <Form.Group  >
                    <label className='labelForm'>Stok Motor</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.stok} name="stok" onChange={handleChange} type="number" placeholder="contoh : 5"  required/>
                    </Form.Group>

                    <Form.Group >
                      <label className='labelForm'>Pilih image, size max 100kb (jpg, png)</label>
                      <Form.Control className='modalUpdateProductImage' name="image" onChange={handleChange} type="file" accept=".jpg, .png" required/>
                    </Form.Group>

                    <button className='modalUpdateProductButton' type="submit">Update Product</button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateProduct