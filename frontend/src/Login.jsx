/* React Hooks */
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function Login({onLogin, message}) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
  }

  return (
    <>
      <Alert variant="info">{message || ''}</Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </Form.Group>
      <Button variant="primary" type="submit">
      Sign In
      </Button>
      </Form>
    </>
  );
}
