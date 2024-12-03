import React, { useState } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

const Navbar = ({ fetchBooks }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setErrorMessage('');
    };

    const addBook = async () => {
        if (!title || !author) {
            setErrorMessage('Please provide both title and author.');
            return;
        }
        const newBook = { title, author };
        try {
            await axios.post('http://localhost:5000/api/books', newBook);
            setTitle('');
            setAuthor('');
            fetchBooks(); 
        } catch (error) {
            setErrorMessage('Failed to add book. Please try again.');
        }
    };

    const deleteBook = async () => {
        if (!deleteId) {
            setErrorMessage('Please provide a book ID to delete.');
            return;
        }
        try {
            await axios.delete(`http://localhost:5000/api/books/${deleteId}`);
            setDeleteId('');
            fetchBooks(); 
        } catch (error) {
            setErrorMessage('Failed to delete book. Please try again.');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Mini Library</h1>
                <div className="nav-links">
                    
                </div>
            </nav>
        </div>
    );
};

export default Navbar;