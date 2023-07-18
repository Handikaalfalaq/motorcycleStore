import {React, useState } from 'react';
import { Card } from "react-bootstrap";
import FolderImg from "../component/assets/img/folderImg"
import "../component/assets/index.css";
import UpdateProduck from './updateProduck'
import Swal from 'sweetalert2';

function Homes() {
  const [showUpdateProduck, setShowUpdateProduck] = useState(false);
  const handleOpenUpdateProduck = () => setShowUpdateProduck(true);

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
  }
  return (
    <div className='containerCard'>
      <Card className="cardHome">
        <div className='imageProduck' style={{backgroundImage: `url(${FolderImg.KtmDuke})`}}></div>
        <Card.Body>
          <Card.Title>Motor KTM DUKE</Card.Title>
          <Card.Text>Informasi Kendaraan</Card.Text>
            <div className="transaction">
              <Card.Text>
                <div className="infoPurchasePrice">Harga Beli</div>
                <div className="purchasePrice">Rp. 56 jt</div>
              </Card.Text>
              <Card.Text>
                <div className="infoSellingPrice">Harga Jual</div>
                <div className="sellingPrice">Rp. 56 jt</div>
              </Card.Text>
            </div>
          
          <Card.Text>Stok : 5 kendaraan</Card.Text>
          <div className='action'>
          <div className='update' onClick={handleOpenUpdateProduck} >Update</div>
            <UpdateProduck show={showUpdateProduck} onHide={()=> setShowUpdateProduck(false)}/>
            <div className='delete' onClick={handleDelete}>Delete</div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cardHome">
        <div className='imageProduck' style={{backgroundImage: `url(${FolderImg.KtmXCFW})`}}></div>
        <Card.Body>
          <Card.Title>Motor KTM 300 EXC TPI</Card.Title>
          <Card.Text>Informasi Kendaraan</Card.Text>
            <div className="transaction">
              <Card.Text>
                <div className="infoPurchasePrice">Harga Beli</div>
                <div className="purchasePrice">Rp. 150 jt</div>
              </Card.Text>
              <Card.Text>
                <div className="infoSellingPrice">Harga Jual</div>
                <div className="sellingPrice">Rp. 165 jt</div>
              </Card.Text>
            </div>
          
          <Card.Text>Stok : 5 kendaraan</Card.Text>
          <div className='action'>
          <div className='update' onClick={handleOpenUpdateProduck} >Update</div>
            <UpdateProduck show={showUpdateProduck} onHide={()=> setShowUpdateProduck(false)}/>
            <div className='delete' onClick={handleDelete}>Delete</div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cardHome">
        <div className='imageProduck' style={{backgroundImage: `url(${FolderImg.KtmRc390})`}}></div>
        <Card.Body>
          <Card.Title>Motor KTM RC 390</Card.Title>
          <Card.Text>Informasi Kendaraan</Card.Text>
            <div className="transaction">
              <Card.Text>
                <div className="infoPurchasePrice">Harga Beli</div>
                <div className="purchasePrice">Rp. 55 jt</div>
              </Card.Text>
              <Card.Text>
                <div className="infoSellingPrice">Harga Jual</div>
                <div className="sellingPrice">Rp. 60 jt</div>
              </Card.Text>
            </div>
          
          <Card.Text>Stok : 5 kendaraan</Card.Text>
          <div className='action'>
          <div className='update' onClick={handleOpenUpdateProduck} >Update</div>
            <UpdateProduck show={showUpdateProduck} onHide={()=> setShowUpdateProduck(false)}/>
            <div className='delete' onClick={handleDelete}>Delete</div>
          </div>
        </Card.Body>
      </Card>

      <Card className="cardHome">
        <div className='imageProduck' style={{backgroundImage: `url(${FolderImg.KtmAdventureRally})`}}></div>
        <Card.Body>
          <Card.Title>Motor KTM RC 390</Card.Title>
          <Card.Text>Informasi Kendaraan</Card.Text>
            <div className="transaction">
              <Card.Text>
                <div className="infoPurchasePrice">Harga Beli</div>
                <div className="purchasePrice">Rp. 267 jt</div>
              </Card.Text>
              <Card.Text>
                <div className="infoSellingPrice">Harga Jual</div>
                <div className="sellingPrice">Rp. 330 jt</div>
              </Card.Text>
            </div>
          
          <Card.Text>Stok : 5 kendaraan</Card.Text>
          <div className='action'>
            <div className='update' onClick={handleOpenUpdateProduck} >Update</div>
            <UpdateProduck show={showUpdateProduck} onHide={()=> setShowUpdateProduck(false)}/>
            <div className='delete' onClick={handleDelete}>Delete</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Homes;