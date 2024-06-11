import { HttpException, HttpStatus } from "@nestjs/common";

class NotEnoughLevelException extends HttpException {
  constructor(attribute: string = '') {
    let message: string;
    if (attribute) {
      message = `The char has not enough level to use this ${attribute}!`;
    } else {
      message = 'The char has not enough level to use some of this attributes!';
    }
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export default NotEnoughLevelException;