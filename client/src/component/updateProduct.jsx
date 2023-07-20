import {React, useState, useEffect} from 'react';
import { Modal, Form} from "react-bootstrap";
import { useMutation } from 'react-query';
import { API } from '../config/Api';

function UpdateProduct({show, onHide, selectedIndex }) {
  
  console.log("idnya", selectedIndex )
  
  const [formUpdateProduct, setFormUpdateProduct] = useState({
      namaMotor: '',
      hargaBeli: '',
      hargaJual: '',
      stok: '',
      image: '',
    })


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await API.get(`/product/${selectedIndex}`);
          const dataProductById = response.data.data;
          setFormUpdateProduct(
            {
              namaMotor: dataProductById.namaMotor,
              hargaBeli: dataProductById.hargaBeli,
              hargaJual: dataProductById.hargaJual,
              stok: dataProductById.stok,
              image: dataProductById.image,
            }
          );
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [selectedIndex ]);

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
        formData.append('image', formUpdateProduct.image[0], formUpdateProduct.image[0].name);
        
        const response = await API.patch(`/product/${selectedIndex }`, formData, config);
        console.log("add product success : ", response);
        console.log("data : ", formData);
  
      } catch (error) { 
        console.log("add product failed : ", error);
      }
    });
    return(
        <Modal show={show} onHide={onHide}>  
            <Modal.Body className='modalLoginBody'>
                <Modal.Title className='modalLoginTitle'>Update Product</Modal.Title>
                <Form className='modalLoginForm' onSubmit={(e) => handleSubmit.mutate(e)}>
                    <Form.Group className="mb-3" >
                    <Form.Control className='modalLoginControl' value={formUpdateProduct.namaMotor} name="namaMotor" onChange={handleChange} type="text" placeholder="Nama Motor" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' value={formUpdateProduct.hargaBeli} name="hargaBeli" onChange={handleChange} type="text" placeholder="Harga Beli" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' value={formUpdateProduct.hargaJual} name="hargaJual" onChange={handleChange} type="text" placeholder="Harga Jual" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                      <Form.Control className='modalLoginControl' value={formUpdateProduct.stok} name="stok" onChange={handleChange} type="text" placeholder="Stok Motor" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <label>Pilih image</label>
                      <Form.Control className='modalLoginControl' name="image" onChange={handleChange} type="file" />
                    </Form.Group>

                    <div className='modalLoginButton' type="submit">Update Product</div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateProduct