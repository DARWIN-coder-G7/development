"use client";
import { usePathname } from "next/navigation";
export default function NotFound(){
       const pathname = usePathname();
    const productId = pathname.split("/")[2];
    const ReviewId = pathname.split("/")[4];
    return(
        <>
        <h1 className="text-red-400 bg-amber-900">Product of ID {productId} Not Found </h1>
        <h4 className="text-red-400 bg-amber-900">Try Another Product</h4>
        </>
    )
}