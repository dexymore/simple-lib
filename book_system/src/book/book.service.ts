import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Import Model from mongoose
import { Book } from './schemas/book.schema'; // Import BookDocument
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private bookModel: Model<Book>, // Use @InjectModel and specify the model name ('Book')
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const filters: any = {};
    const resPerPAge = 2;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * resPerPAge;
    if (query.keyword) {
      filters.title = { $regex: query.keyword, $options: 'i' };
    }

    if (query.category) {
      filters.category = query.category;
    }
    if (query.year) {
      const fullYear = query.year;

      // Convert the full year to a Date object for the start of that year
      const startDate = new Date(`${fullYear}-01-01T00:00:00.000Z`);
      // Convert the full year to a Date object for the end of that year
      const endDate = new Date(`${fullYear}-12-31T23:59:59.999Z`);

      filters.publishedDate = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const books = await this.bookModel
      .find(filters)
      .limit(resPerPAge)
      .skip(skip); // Use the model to find all books
    return books;
  }

  async createbook(book: Book): Promise<Book> {
    const newBook = await this.bookModel.create(book); // Create a new document
    return newBook;
  }
  async findById(id: string): Promise<Book[]> {
    const book = await this.bookModel.find({ _id: id }); // Use the model to find a single book by id
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book; // Return the book
  }
}
