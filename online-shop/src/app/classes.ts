export interface Product{
id:String;
name:String;
category:String;
price:Number;
image?:String;
description?:String;
quantity:number;
}
export interface ProductPostTemplate{
productId:String;
name:String;
category:String;
price:Number;
image?:String;
description?:String;
quantity:number;
}