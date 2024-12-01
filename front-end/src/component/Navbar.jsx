import React, { useState } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css'; // Ensure Font Awesome is imported

const Navbar = ({ fetchBooks }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
        setErrorMessage(''); // Clear error message when toggling
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
            fetchBooks(); // Refresh the book list
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
            fetchBooks(); // Refresh the book list
        } catch (error) {
            setErrorMessage('Failed to delete book. Please try again.');
        }
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Mini Library</h1>
                <div className="nav-links">
                    <button onClick={toggleDrawer} aria-label="Toggle drawer">
                        <i className="fa fa-user" aria-hidden="true"></i> {/* Human icon */}
                    </button>
                </div>
            </nav>

            {isDrawerOpen && (
                <div className="drawer">
                    <button className="close-btn" onClick={toggleDrawer} aria-label="Close drawer">X</button>
                    <h2>Add a Book</h2>
                    <div className="add-book-section">
                        <input
                            type="text"
                            placeholder="Book Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Book Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        {/* Button positioned directly under the input fields */}
                        <button onClick={addBook}>Add Book</button>
                    </div>
                    <h3>Delete Book</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Book ID to Delete"
                            value={deleteId}
                            onChange={(e) => setDeleteId(e.target.value)}
                        />
                        <button onClick={deleteBook}>Delete Book</button>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default Navbar;