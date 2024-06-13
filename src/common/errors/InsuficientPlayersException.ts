import { HttpException, HttpStatus } from '@nestjs/common';

class InsuficientPlayersException extends HttpException {
  constructor(message: string = 'There is no sufficient players to start a game!') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export default InsuficientPlayersException;