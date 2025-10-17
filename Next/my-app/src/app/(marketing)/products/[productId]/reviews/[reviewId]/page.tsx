import { notFound } from "next/navigation";

export default async function Review(
    {params}:{params:Promise<{productId:string;reviewId:string}>}
){
const Id = (await params).reviewId;
if(Number.parseInt(Id)>1000){
    notFound();
}
    return <>
    <h1 className="xl" >Here You can See and verify the Review whichever is made by users {Id}</h1>
    </>
}

// We can also get the Product Id  if we Needed