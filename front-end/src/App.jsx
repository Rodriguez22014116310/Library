import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import './App.css'; 
import Navbar from './component/Navbar'; 
import { Link } from 'react-router-dom'; 

const App = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        setError(null); 
        try {
            const response = await axios.get('http://localhost:5000/api/books');
            setBooks(response.data);
        } catch (err) {
            setError('Failed to fetch books. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app">
            <Navbar fetchBooks={fetchBooks} />

            <div className="main-content">
                <div className="admin-link">
                    <Link to="/admin" className="admin-panel-link">
                        <i className="fa fa-user"></i> Admin
                    </Link>
                </div>

                <div className="search-container">
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search by Title or Author"
                            value={searchQuery}
                            onChange={handleSearchQuery}
                        />
                        <button onClick={clearSearch}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>

                {loading && <p>Loading books...</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="book-list">
                    {filteredBooks.length === 0 && !loading && <p>No books found.</p>}
                    {filteredBooks.map(book => (
                        <div key={book.id} className="book-item">
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;