import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');
  const [year, setYear] = useState(null);
  const [category, setCategory] = useState('');

  function getYearFromDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year;
  }

  async function getAllBooks() {
    try {
      let url = 'http://localhost:3000/book';

      if (filter) {
        url += `?keyword=${filter}`;
      }
      if (year) {
        url += `${filter ? '&' : '?'}year=${year}`;
      }
      if (category) {
        url += `${filter || year ? '&' : '?'}category=${category}`;
      }

      const response = await axios.get(url);
      setBooks(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllBooks();
  }, [books]);

  return (
    <div className='container d-flex justify-content'>
    
      <div>
        
        <h1>Welcome to  Optomatica!</h1>
        <div >
         <a href="/"> Home </a>||
        <a href="/add"> Add New Book </a>
    </div>
    
        <p>Here you will find all books you need.</p>

        <div className='w-100'>
        <div className="input-group mt-2 m-auto">
        <div className="form-outline">
          <input
            id="search-input"
            type="search"
            className="form-control"
            placeholder="Search by title or author"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
        </div>
        <button id="search-button" type="button" onClick={getAllBooks} className="btn btn-primary">
          <i className="fas fa-search"></i> Search
        </button>
      </div>
      <div className="input-group mb-3 mt-2 m-auto">
        <div className="form-outline">
          <input
            id="search-input"
            type="search"
            className="form-control"
            placeholder="Search by year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
        </div>
        <button id="search-button" type="button" onClick={getAllBooks} className="btn btn-primary">
          <i className="fas fa-search"></i> Search 
        </button>

      </div>
          {books.map((book) => (
            <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem' }} key={book.id}>
              <div className="card-header">{book.title}</div>
              <div className="card-body">
                <h5 className="card-title">{book.author}</h5>
                <ul>
                  <li>{book.category}</li>
                  <li>{getYearFromDate(book.publishedDate)}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
}

export default HomePage;
