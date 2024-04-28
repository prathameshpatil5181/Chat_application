import { Request, Response } from "express";
import { getAllMessages } from "../../Models/MessageModels/MessageModel";
export const getMessagesController = async (req:Request,res:Response) => {

    const userId = req.body.user.id;
    if (!userId) {
        res.status(404).json({
            success: false,
            result:null
        })
        return;
    }
    
    const result = await getAllMessages(userId);

    if (!result?.success) {
        res.status(404).json({
          success: false,
          result: null,
        });
        return; 
    }

   

    res.status(200).json(result); 

    return;
}