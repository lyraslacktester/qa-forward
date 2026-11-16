import type { NextFunction, Request, Response } from 'express';

import { findApiKey } from '../keys';

/**
 * Accepts the API key in the `X-TeaCapital-Key` header on every /v1 route.
 */
export async function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const token = req.header('X-TeaCapital-Key');

  if (!token) {
    return res.status(401).json({ error: 'missing_api_key', message: 'Send your API key in the X-TeaCapital-Key header.' });
  }

  const key = await findApiKey(token);
  if (!key) {
    return res.status(401).json({ error: 'invalid_api_key', message: 'This API key is not valid.' });
  }

  res.locals.account = key.account;
  return next();
}
