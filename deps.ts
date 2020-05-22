//import { Request, Response, PathHandler } from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import vary from 'https://cdn.pika.dev/vary@^1.1.2';

//type Next = () => Promise<void>;  
//type Handler = (req: Request, res: Response, next: Next) => Promise<void>;
//type EndHandler = (req: Request, res: Response) => Promise<void>;
//type Middleware = Handler | PathHandler;

let assign = Object.assign;

export {
//  Request,
//  Response,
//  Next,
//  EndHandler,
//  Middleware,
  assign,
  vary
};
