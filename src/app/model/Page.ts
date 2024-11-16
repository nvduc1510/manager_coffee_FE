import { Product } from "./Product";
export interface Page {
    code : string;
    totalRecords : number;
    listProduct : Product[];
}