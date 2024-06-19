import { HttpException } from '@nestjs/common';

export interface Left<A> {
  value: A;
  tag: 'left';
}

export interface Right<B> {
  value: B;
  tag: 'right';
}

export type Either<A, B> = Left<A> | Right<B>;

export function isLeft<A, B>(val: Either<A,B>): val is Left<A> {
  return val.tag === 'left';
}

export function isRight<A, B>(val: Either<A,B>): val is Right<B> {
  return val.tag === 'right';
}

export function left<A>(val: A): Left<A> {
  return { value: val, tag: 'left' };
}

export function right<A>(val: A): Right<A> {
  return { value: val, tag: 'right' };
}

export function getError(val: Left<HttpException>) {
  return { error: val.value.name, message: val.value.message, status: val.value.getStatus() };
}

export function getResult(val: Right<any>): Partial<any> {
  delete val.tag;
  return val;
}