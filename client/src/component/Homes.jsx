import React from 'react';
import { Card } from "react-bootstrap";
import FolderImg from "../component/assets/img/folderImg"
import "../component/assets/index.css";

function Homes() {
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
            <div className='update'>Update</div>
            <div className='delete'>Delete</div>
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
            <div className='update'>Update</div>
            <div className='delete'>Delete</div>
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
            <div className='update'>Update</div>
            <div className='delete'>Delete</div>
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
            <div className='update'>Update</div>
            <div className='delete'>Delete</div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Homes;