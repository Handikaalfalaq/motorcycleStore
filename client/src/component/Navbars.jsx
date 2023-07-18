import {React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Form, Nav, Navbar} from "react-bootstrap"; 
import "../component/assets/index.css";
import FolderImg from "../component/assets/img/folderImg"
import ModalLogin from './auth/ModalLogin'
import ModalRegister from './auth/ModalRegister'
import NewProduck from './newProduck'

function Navbars() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showNewProduck, setShowNewProduck] = useState(false);
  
  const handleOpenLogin = () => setShowLogin(true);
  const handleOpenRegister = () => setShowRegister(true);
  const handleOpenNewProduck = () => setShowNewProduck(true);

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

  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={FolderImg.LogoKtm} alt="icon" className='logoNavbar'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search"/>
              <div className='buttonSearch'>Search</div>
            </Form>
          </Nav>

          <nav className="buttonPlusProduck me-auto" onClick={handleOpenNewProduck}>
              <div className="logoPlus"> + </div>
              <div className="plusProduck">Tambah Produck</div>
          </nav>
          
          <div className='login' onClick={handleOpenLogin}>Login</div>
          <div className='register' onClick={handleOpenRegister}>Register</div>
        </Navbar.Collapse>

        <ModalLogin show={showLogin} onHide={()=> setShowLogin(false)} hereRegister={hereRegister} />
        <ModalRegister show={showRegister} onHide={()=> setShowRegister(false)} hereLogin={hereLogin}/>
        <NewProduck show={showNewProduck} onHide={()=> setShowNewProduck(false)}/>
      </Container>
      
    </Navbar>
  );
}

export default Navbars;