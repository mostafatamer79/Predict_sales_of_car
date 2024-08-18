import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers["authorization"]?.split(" ")[1]
    if(!token){
      return res.status(HttpStatus.UNAUTHORIZED)
      .json({message:"please add the tkon"})
    }
    next();
  }
}
