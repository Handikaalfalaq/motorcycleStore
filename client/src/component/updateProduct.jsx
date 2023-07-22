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
          console.log("add product success : ", response);
          console.log("data : ", formData);
          
          Swal.hideLoading();
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

    // const handleSubmit = useMutation(async (e) => {
    //   try {
    //     console.log("berhasil")
    //     e.preventDefault();

    //     const config = {
    //       headers: {
    //         'Content-type': 'multipart/form-data',
    //       },
    //     };

    //     const formData = new FormData();
    //     formData.set('namaMotor', formUpdateProduct.namaMotor);
    //     formData.set('hargaBeli', formUpdateProduct.hargaBeli);
    //     formData.set('hargaJual', formUpdateProduct.hargaJual);
    //     formData.set('stok', formUpdateProduct.stok);
    //     formData.append('image', formUpdateProduct.image[0], formUpdateProduct.image[0].name);
        
    //     const response = await API.patch(`/product/${idProduct}`, formData, config);
    //     console.log("add product success : ", response);
    //     console.log("data : ", formData);
  
    //   } catch (error) { 
    //     console.log("gagal")
    //     console.log("add product failed : ", error);
    //   }
    // });


    return(
        <Modal show={show} onHide={onHide}>  
            <Modal.Body className='modalUpdateProductBody'>
                <Modal.Title className='modalUpdateProductTitle'>Update Product</Modal.Title>
                <Form className='modalUpdateProductForm' onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className="mb-3" >
                    <label>Harga Beli ('42.6 jt')</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.namaMotor} name="namaMotor" onChange={handleChange} type="text" placeholder="Nama Motor" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <label>Harga Beli ('42.6 jt')</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.hargaBeli} name="hargaBeli" onChange={handleChange} type="number" placeholder="Harga Beli" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <label>Harga Jual ('54.3 jt')</label>
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.hargaJual} name="hargaJual" onChange={handleChange} type="number" placeholder="Harga Jual" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalUpdateProductControl' value={formUpdateProduct.stok} name="stok" onChange={handleChange} type="number" placeholder="Stok Motor" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <label>Pilih image, size max 100kb (jpg, png)</label>
                      <Form.Control className='modalUpdateProductControl' name="image" onChange={handleChange} type="file" accept=".jpg, .png"/>
                    </Form.Group>

                    <button className='modalUpdateProductButton' type="submit">Update Product</button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateProduct