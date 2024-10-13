import { Request, Response } from "express";
import { SearchModel, searchUserModel } from "../../Models/SearchModel";
import { IResult } from "../../Models/SearchModel";

export const SearchController = async (req: Request, res: Response) => {
  let searchString: string = req.body.search;

  if (searchString === "") {
    res.status(200).json({
      result: "empty",
    });
    return;
  }

  searchString = searchString.trim().toLowerCase();

  console.log(searchString);

  const Result: IResult[] | string = await SearchModel(searchString);

  if (Result === "Error") {
    res.status(500).json({
      result: false,
    });
  } else {
    res.status(200).json({
      result: Result,
    });
  }
};

export const searchUserController = async (req: Request, res: Response) => {
  const searchString: string = req.body.search;

  const Result = await searchUserModel(searchString);
  res.status(200).json({
    result: Result,
  });
};
