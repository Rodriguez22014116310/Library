import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [books, setBooks] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
            alert("Failed to fetch books. Please try again later.");
        }
    };

    useEffect(() => {
        fetchBooks(); // Fetch the initial list of books
    }, []);

    const addBook = async () => {
        if (!title || !author) return; // Prevent adding empty books
        const newBook = { title, author };
        try {
            await axios.post('http://localhost:5000/api/books', newBook);
            setBooks(prevBooks => [...prevBooks, newBook]); // Update state directly
            setTitle('');
            setAuthor('');
        } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book. Please try again.");
        }
    };

    const deleteBook = async (id) => {
        if (!id) return; // Prevent deleting without ID
        const confirmed = window.confirm("Are you sure you want to delete this book?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`);
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id)); // Remove from state
            setDeleteId(''); // Clear the delete input
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("Failed to delete book. Please try again.");
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1> {/* Added Admin Panel title */}
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
                <button onClick={() => deleteBook(deleteId)}>Delete Book</button>
            </div>

            <h3>Current Books</h3>
            <button onClick={fetchBooks}>Refresh Book List</button>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;