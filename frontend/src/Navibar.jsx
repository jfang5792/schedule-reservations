/* Navigation top bar */

/* Components */
import Register from './Register'
import Login from './Login'

/* React Hooks */
import { useState } from 'react';

import { Link } from 'react-router-dom';

/* React Bootstrap Components */
import {Container, Navbar, OverlayTrigger, Tooltip, Button, Modal} from 'react-bootstrap';


export default function NavbarComponent() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('signin'); //'register'
    const [message, setMessage] = useState([]);
    const [inputUsername, setInputUsername] = useState('');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleShowSignIn = () => {
      setModalMode('signin');
      setShowModal(true);
    };

    const handleShowRegister = () => {
      setModalMode('register');
      setShowModal(true);
    };

    const handleLogin = async (inputUsername) => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: inputUsername }),
        });

        const data = await response.json();

        if (response.ok) {
          setLoggedIn(true);
          setUsername(inputUsername);
          setMessage(data.msg);
          await new Promise(resolve => setTimeout(resolve, 3000));
          setMessage('');
          handleClose();
          // if res ok - goes frm reg to sign in modal
        } else {
          if (!response.ok) {
          console.error('Login failed:', data.msg);
          setMessage(data.msg);
          await new Promise(resolve => setTimeout(resolve, 6000));
          setMessage('');
        }
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setMessage("Error during log in");
      }
    };

    const handleRegister = async (inputUsername) => {
      try {
        if (!inputUsername) {
          console.error('Username was empty');
          return 'Username field was empty'
        }

        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: inputUsername }),
        });

        const data = await response.json();

        // console.log('server res statusCode:', response.status);
        // console.log('server res data:', data);

        if (response.ok) {
          setLoggedIn(true);
          setUsername(data.username);
          setMessage(data.msg)
          await new Promise(res => setTimeout(res, 3000));
          setMessage('');
          handleClose();
        } else {
          console.error('Registration failed:', data.msg);
          setMessage(data.msg || "Account with username exists.")
          await new Promise(res => setTimeout(res, 3000));
          setMessage('');
          setModalMode('signin');
          setShowModal(true);
        }
      } catch (err) {
        console.error('Error during registration:', err);
        setMessage("Error registering");
      }
    };

    const handleSubmit = () => {
      if (modalMode === 'signin') {
        handleLogin();
      } else {
        handleRegister();
      }
    };

    const handleLogOut = () => {
      setLoggedIn(false);
      setUsername('');
    };

    const hoveringLogout = (props) => (
    <Tooltip id="button-tooltip" {...props}> Click to sign out </Tooltip>
    )


  return (
    <>
      <Navbar className="bg-body-tertiary fixed-top">
        <Container>
          <Link to="/" className="navbar text-decoration-none">
          <Navbar.Brand>🍉 Taste Exquisite Melon Pairings: an experience never like before!</Navbar.Brand></Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {isLoggedIn ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={hoveringLogout}
              >
                <Navbar.Text
                  onClick={handleLogOut}
                  style={{ cursor: 'pointer' }}
                >
                  Signed in as: {username}
                </Navbar.Text>
              </OverlayTrigger>
            ) : (
              <>
                <Button className='regSubmitBtn me-2' variant="outline-primary" onClick={handleShowRegister}>
                  Register
                </Button>
                <Button className='loginBtn' variant="outline-success" onClick={handleShowSignIn}>
                  Sign In
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'signin' ? 'Sign In' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMode === 'signin' ? (
            <Login onLogin={handleLogin} message={message}/>
          ) : (
            <Register onRegister={handleRegister} message={message}/>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
