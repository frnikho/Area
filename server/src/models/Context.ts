import {TokenData} from "../controllers/ServiceController";

export interface Context {
    uuid?: string,
    title: string,
    description: string,
    tokenData: TokenData,
    created_date?: Date,
    updated_date?: Date,
}
