import { Router } from "express";
import { SearchController, searchUserController } from "../Controllers/SearchContrller/SearchContrller";
const searchRouter = Router();

searchRouter.post("/search", SearchController);
searchRouter.post('/searchone', searchUserController);

export default searchRouter;
