import { Request, Response } from "express";
import { SearchModel, searchUserModel } from "../../Models/SearchModel";
import { IResult } from "../../Models/SearchModel";
export const SearchController = async (req: Request, res: Response) => {
  const searchString: string = req.body.search;

  const Result: IResult[] = await SearchModel(searchString);
  res.status(200).json({
    result: Result,
  });
};

export const searchUserController = async (req: Request, res: Response) => {
  const searchString: string = req.body.search;

  const Result = await searchUserModel(searchString);
  res.status(200).json({
    result: Result,
  });
};
