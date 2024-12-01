import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome
import './App.css'; // Import the CSS file
import Navbar from './component/Navbar'; // Import the Navbar component

const App = () => {
    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchAuthor, setSearchAuthor] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
    };

    const handleSearchTitle = (e) => {
        setSearchTitle(e.target.value);
    };

    const handleSearchAuthor = (e) => {
        setSearchAuthor(e.target.value);
    };

    const clearSearch = () => {
        setSearchTitle('');
        setSearchAuthor('');
    };

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTitle.toLowerCase()) || 
        book.author.toLowerCase().includes(searchAuthor.toLowerCase())
    );

    return (
        <div className="app">
            <Navbar fetchBooks={fetchBooks} />

            <div className="main-content">
                {/* Search Section Container */}
                <div className="search-container">
                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Search by Title"
                            value={searchTitle}
                            onChange={handleSearchTitle}
                        />
                        <input
                            type="text"
                            placeholder="Search by Author"
                            value={searchAuthor}
                            onChange={handleSearchAuthor}
                        />
                        <button onClick={clearSearch}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>

                <div className="book-list">
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