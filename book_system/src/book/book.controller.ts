import { BookService } from './book.service';
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common'; // Import Get decorator
import { Book } from './schemas/book.schema'; // Import Book interface
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {} // Fix the constructor parameter name

  @Get() // Use @Get decorator to define a GET endpoint
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query); // Use the service to find all books
  }
  @Post() // Use @Post decorator to define a POST endpoint
  async createBook(@Body() book: Book): Promise<Book> {
    return this.bookService.createbook(book); // Use the service to create a new book
  }
  @Get(':id') // Use @Get decorator to define a GET endpoint
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book[]> {
    return this.bookService.findById(id); // Use the service to find all books
  }
}
