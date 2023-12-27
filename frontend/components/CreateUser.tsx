import React, { useState } from 'react';

interface CreateUserProps {
    fetchUsers: () => void
}

const CreateUser: React.FC<CreateUserProps> = ({ fetchUsers }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err);
            }

            fetchUsers(); // Re-fetch users after creation
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" required onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    )
    }
export default CreateUser;