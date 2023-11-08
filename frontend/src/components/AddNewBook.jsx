
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddNewBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !publishedDate || !category) {
      setStatus('Please fill all the fields');
    } else {
      const book = {
        title,
        author,
        publishedDate: new Date(publishedDate).toISOString(),
        category,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.post('http://localhost:3000/book', book, config);
        console.log(response);
        setStatus('Book successfully added');
      } catch (e) {
        setStatus('Error adding book');
        console.error(e);
      }
    }
 setTimeout(() => {
        setStatus('');
      }, 2000); 
    
    };


      
    
  

  return (
    
    <div className='container mt-5 w-50 '>
    <div >
         <a href="/"> Home </a>||
        <a href="/add"> Add New Book </a>
    </div>
    
    {status && <h3>{status}</h3>}


      <Form className='mt-5'>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='publishedDate'>
          <Form.Label>Published Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter published date'
            value={publishedDate}
            onChange={(event) => setPublishedDate(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as='select'
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value=''>Select category</option>
            <option value='Fiction'>Fiction</option>
            <option value='Nonfiction'>Nonfiction</option>
            <option value='History'>History</option>
            <option value='Biography'>Biography</option>
          </Form.Control>
        </Form.Group>

        <div className='d-flex justify-content-between align-items-center'>
          <Button variant='primary' type='button' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddNewBook;
