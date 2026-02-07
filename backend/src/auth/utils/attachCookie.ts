import { Response } from 'express';

export const attachCookie = (
  res: Response,
  name: string,
  token: string,
  exp: number,
) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + exp * 1000),
  });
};
