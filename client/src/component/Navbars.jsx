import {React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Nav, Navbar} from "react-bootstrap"; 
import "../component/assets/index.css";
import FolderImg from "../component/assets/img/folderImg"
import ModalLogin from './auth/ModalLogin'
import ModalRegister from './auth/ModalRegister'
import NewProduct from './newProduct'
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Swal from 'sweetalert2';

function Navbars() {
  const [state, dispatch] = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  
  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenRegister = () => setShowRegister(true);
  const handleOpenNewProduct = () => setShowNewProduct(true);

  const hereLogin = (e) => {
    e.preventDefault();
    setShowLogin(true);
    setShowRegister(false);
  }

  const hereRegister = (e) => {
    e.preventDefault();
    setShowLogin(false)
    setShowRegister(true)
  }

  const logout = () => {
    Swal.fire({
      title: 'Apakah Anda akan Logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "LOGOUT"
        })
        Swal.fire(
          'Berhasil Logout!',
        )
      }
    })
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={FolderImg.LogoKtm} alt="icon" className='logoNavbar'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchValue} onChange={handleSearchChange}/>
            <div className='buttonSearch' onClick={handleSearchSubmit}>Search</div>
          </Form>
          </Nav>

          {state.user.role === "admin" ? (
            <nav className="buttonPlusProduct me-auto" onClick={handleOpenNewProduct}>+ Tambah Product </nav>  
          ) : (
            <div></div>
          )}
          
          {state.isLogin ? (
            <>
              <div className='fullNameLogin'>hallo... {state.user.fullName.split(' ')[0]}</div>
              <div className='logOut' onClick= { () => logout()}>logout</div>
            </>
          ) : (
            <>
              <div className='login' onClick={handleOpenLogin}>Login</div>
              <div className='register' onClick={handleOpenRegister}>Register</div>
            </>
          )}

        </Navbar.Collapse>

        <ModalLogin show={showLogin} onHide={()=> setShowLogin(false)} hereRegister={hereRegister} />
        <ModalRegister show={showRegister} onHide={()=> setShowRegister(false)} hereLogin={hereLogin}/>
        <NewProduct show={showNewProduct} onHide={()=> setShowNewProduct(false)}/>
      </Container>
      
    </Navbar>
  );
}

export default Navbars;