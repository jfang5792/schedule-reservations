/* React Hooks */
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function Register({onRegister, message}) {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering username:', username);
        onRegister(username);
    };

    return (
        <>
            <Alert variant="info">{message || ''}</Alert>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
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
            Register
            </Button>
            </Form>
        </>
    );
}
