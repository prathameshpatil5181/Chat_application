import { Request,Response } from "express"

export const validate =  (req: Request, res: Response)=>{
    res.status(200).json({ result: true });
}