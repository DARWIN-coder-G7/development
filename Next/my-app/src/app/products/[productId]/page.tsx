"use client";
import { usePathname } from "next/navigation";
import NotFound from "./not-found";

export default function ProductDetails({ params }: { params: Promise<{ productId: string }> }) {
    const pathname = usePathname();
    const productId = pathname.split("/")[2];
    const ReviewId = pathname.split("/")[4];
    // const productId = (await params).productId;
    if(Number.parseInt(productId) > 100){
        NotFound();
    }
    return <h3 className="text-blue-400 bg-emerald-200" >Product Details Page {productId}</h3>;
}