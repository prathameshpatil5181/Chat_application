import { Request,Response } from "express"
import { getUserDetails } from "../../Models/userModels/updateProfieModel";
export const validate = async (req: Request, res: Response) => {

    const userid = req.body.user.id;
    const result = await getUserDetails(userid);

    if (result.success === true) {
      return  res.status(200).json({
            success:result.success,
            result: result.result
        });
    }
    return res.status(200).json({
      success: result.success,
      result: result.result,
    });
}