import { React, useState, useEffect } from 'react';
import { Card } from "react-bootstrap";
import "../component/assets/index.css";
import UpdateProduct from './updateProduct';
import Swal from 'sweetalert2';
import { API } from '../config/Api';

function Homes() {
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataAllProduct, setDataAllProduct] = useState([]);

  const handleOpenUpdateProduct = (index) => {
    console.log("Clicked Update for index:", index);
    setShowUpdateProduct(true);
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/products`);
        setDataAllProduct(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });
  };

  return (
    <div className='containerCard'>
      {isLoading ? (
        <div></div>
      ) : (
        dataAllProduct.length > 0 ? (
          dataAllProduct.map((item, index) => (
            <Card className="cardHome" key={index}>
              <div className='imageProduct' style={{backgroundImage: `url(${item.image})`}}></div>
              <Card.Body>
                <Card.Title>{item.namaMotor}</Card.Title>
                <div className="transaction">
                  <Card.Text>
                    <div className="infoPurchasePrice">Harga Beli</div>
                    <div className="purchasePrice">Rp. {item.hargaBeli}</div>
                  </Card.Text>
                  <Card.Text>
                    <div className="infoSellingPrice">Harga Jual</div>
                    <div className="sellingPrice">Rp. {item.hargaJual}</div>
                  </Card.Text>
                </div>
                <Card.Text>Stok : {item.stok} kendaraan</Card.Text>
                <div className='action'>
                  <div className='update' onClick={() => handleOpenUpdateProduct(index)}>Update</div>
                  <UpdateProduct show={showUpdateProduct} onHide={() => setShowUpdateProduct(false)} selectedIndex={index}/>
                  <div className='delete' onClick={handleDelete}>Delete</div>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No products found.</div>
        )
      )}
    </div>
  );
}

export default Homes;
