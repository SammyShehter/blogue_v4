import { NextApiRequest, NextApiResponse } from "next";

const loginMiddleware = (req: NextApiRequest, res: NextApiResponse, next: any) => {
    if(req.method !== "POST") {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
      if(!req.body || !req.body.username || !req.body.password) {
        res.status(400).end(`Wrong Request`);
      }
  
    next();
  };
  
  export default loginMiddleware
  