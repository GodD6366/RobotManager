import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export type MyNextApiResponse = NextApiResponse & {
  success: (data?: any) => void;
  error: (message: string, code?: string | number, statusCode?: number) => void;
};

export type TResponse = {
  success: boolean;
  data: any;
};

function success(data?: any) {
  this.status(200).json({
    success: true,
    data,
  });
  this.end();
}

function error(message: string, code: number = 500, statusCode: number = code) {
  this.status(statusCode).json({
    success: false,
    code,
    message,
  });
  this.end();
}

export async function parseResult(
  req: NextApiRequest,
  res: MyNextApiResponse,
  next: NextHandler,
) {
  res.success = success;
  res.error = error;
  next();
}
