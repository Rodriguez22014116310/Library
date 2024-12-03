import React, { useState } from 'react';
import Header from './header'; 
import './CSS/admin.css'; 

const Admin = () => {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({ title: '', author: '', year: '', id: null });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleYearChange = (e) => {
        const { value } = e.target;
    
        if (/^\d{0,4}$/.test(value)) {
            setBook({ ...book, year: value });
        }
    };

    const addBook = () => {
        if (book.title && book.author && book.year) {
            setBooks([...books, { ...book, id: Date.now() }]);
            setBook({ title: '', author: '', year: '', id: null });
        }
    };

    const deleteBook = (id) => {
        setBooks(books.filter(b => b.id !== id));
    };

    const updateBook = () => {
        setBooks(books.map(b => (b.id === book.id ? book : b)));
        setBook({ title: '', author: '', year: '', id: null });
    };

    const editBook = (bookToEdit) => {
        setBook(bookToEdit);
    };

    return (
        <div className="admin-container">
            <Header />
            <div className="form-and-list-container">
                <div className="form-container">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={book.title}
                        onChange={handleInputChange}
                        className="input"
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author"
                        value={book.author}
                        onChange={handleInputChange}
                        className="input"
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={book.year}
                        onChange={handleYearChange} 
                        className="input"
                    />
                    <button onClick={book.id ? updateBook : addBook} className="button">
                        {book.id ? 'Update Book' : 'Add Book'}
                    </button>
                </div>

                <div className="book-list-container">
                    <h2>Book List</h2>
                    <ul className="book-list">
                        {books.map(b => (
                            <li key={b.id} className="book-item">
                                <div className="book-info">
                                    {b.title} by {b.author} ({b.year})
                                </div>
                                <div className="book-actions">
                                    <button onClick={() => editBook(b)} className="action-button">Edit</button>
                                    <button onClick={() => deleteBook(b.id)} className="action-button">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Admin;