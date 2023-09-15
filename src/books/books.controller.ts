import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('create')
  async create(@Body() data: BookDTO) {
    return this.booksService.create(data);
  }

  @Get('list')
  async findAll() {
    return this.booksService.findAll();
  }

  @Put(':id')
  async update(@Body() data: BookDTO, @Param('id') id: string) {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
