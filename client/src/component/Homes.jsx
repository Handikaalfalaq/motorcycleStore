import { React, useState, useEffect } from 'react';
import { Card } from "react-bootstrap";
import "../component/assets/index.css";
import UpdateProduct from './updateProduct';
import Swal from 'sweetalert2';
import { API } from '../config/Api';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

function Homes() {
  const [state] = useContext(UserContext);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [idProduct, setIdProduct] = useState('');
  const [dataAllProduct, setDataAllProduct] = useState([]);
  const [posisiPage, setPosisiPage] = useState(1);
  const dataPerPage = 9;

  const handleOpenUpdateProduct = (id) => {
    console.log("Clicked Update for index:", id);
    setIdProduct(id);
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

const handleDelete = async (productId) => {
  try {
    console.log("idnyaaaa", productId);
    const response = await API.delete(`/product/${productId}`);
    console.log("delete product success : ", response);
  } catch (error) {
    console.log("delete product failed : ", error);
  }
};

  const handleOpenDeleteProduct = (productId) => {
    console.log("ini id", productId);
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Tindakan ini akan menghapus file!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus saja!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(productId);
        
        Swal.fire(
          'Terhapus!',
          'File Anda telah dihapus.',
          'success'
        ).then(() => {
          window.location.reload();
        });
      }
    })
  };

  const indexDataTerakhir = posisiPage * dataPerPage;
  const indexDataPertama = indexDataTerakhir - dataPerPage;
  const dataDitampilkan = dataAllProduct.slice(indexDataPertama, indexDataTerakhir);

  const nomorPage = [];
  for (let i = 1; i <= Math.ceil(dataAllProduct.length / dataPerPage); i++) {
    nomorPage.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setPosisiPage(pageNumber);
  };

  const handleNextPageClick = () => {
    if (posisiPage < nomorPage.length) {
      setPosisiPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPageClick = () => {
    if (posisiPage > 1) {
      setPosisiPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className='containerCard'>
        {isLoading ? (
          <div></div>
        ) : (
          dataDitampilkan.length > 0 ? (
            dataDitampilkan.map((item, index) => (
              <Card className="cardHome" key={index}>
                <div className='imageProduct' style={{backgroundImage: `url(${item.image})`}}></div>
                <Card.Body>
                  <Card.Title>{item.namaMotor}</Card.Title>
                  <div className="transaction">
                    <div>
                      <div className="infoPurchasePrice">Harga Beli</div>
                      <div className="purchasePrice">Rp. {item.hargaBeli}</div>
                    </div>
                    <div>
                      <div className="infoSellingPrice">Harga Jual</div>
                      <div className="sellingPrice">Rp. {item.hargaJual}</div>
                    </div>
                  </div>
                  <div className='stok'>Stok : {item.stok} kendaraan</div>

                  {state.user.role === 'admin' ? (
                    <div className='action'>
                    <div className='update' onClick={() => handleOpenUpdateProduct(item.id)}>Update</div>
                    <UpdateProduct show={showUpdateProduct} onHide={() => setShowUpdateProduct(false)} idProduct={idProduct}/>
                    <div className='delete' onClick={() => { handleOpenDeleteProduct(item.id) }}>delete</div>
                  </div>
                  ) : (
                    <div> </div>
                  )}
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>No products found.</div>
          )
        )}
        
      </div>
      
      <div className="pagination">
        {posisiPage > 1 && <div onClick={handlePreviousPageClick}> &lt; </div>}
        {nomorPage.map((number) => (
          <div key={number} onClick={() => handlePageClick(number)} className={number === posisiPage ? "active" : ""} style={number === posisiPage ? { color: "#fe6600" } : {}}>
          {number}
        </div>
        
        ))}
        {posisiPage < nomorPage.length && <div onClick={handleNextPageClick}> &gt; </div>}
      </div>
    </>
  );
}

export default Homes;
