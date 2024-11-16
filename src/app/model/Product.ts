import { Collections } from "./Collection";

export interface Product {
    productId : number;
    productName : string;
    productPrice : string;
    productImage : string;
    collections : string;
    collectionId : Collections
}