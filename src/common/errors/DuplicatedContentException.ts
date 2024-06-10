import { HttpException, HttpStatus } from '@nestjs/common';

class DuplicatedContentException extends HttpException {
  constructor(message: string = 'Duplicated Content') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export default DuplicatedContentException;