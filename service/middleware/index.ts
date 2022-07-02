import { NextApiRequest } from 'next';
import nextConnect from 'next-connect';
import Boom from '@hapi/boom';
import { parseResult, MyNextApiResponse } from './result';

export function nc() {
  return nextConnect({
    async onError(err, req: NextApiRequest, res: MyNextApiResponse) {
      if (Boom.isBoom(err)) {
        res.error(err.output.payload.message, err.output.payload.statusCode);
      } else {
        res.error('Unexpected error', 99999, 500);
        console.error(err);
      }
      res.end();
      console.log(err);
    },
    onNoMatch(req: NextApiRequest, res: MyNextApiResponse) {
      const err = Boom.notFound();
      res.error(err.output.payload.message, err.output.payload.statusCode);
    },
  }).use(parseResult);
}

export * from './result';
