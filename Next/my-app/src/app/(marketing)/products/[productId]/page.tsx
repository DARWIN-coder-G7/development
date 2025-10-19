
import { Metadata } from "next";
import NotFound from "./not-found";
import Link from "next/link";

type Props = { params: Promise<{ productId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = (await params).productId;
    return {
        title: `Product ${id}`,
        description: `These are about the products and its details`
    }
}

export default async function ProductDetails({ params }: Props) {

    const productId = (await params).productId;
    if (Number.parseInt(productId) > 100) {
        NotFound();
    }
    return <>
        <h3 className="text-blue-400 bg-emerald-200" >Product Details Page {productId}</h3>
        <Link href={'/products'} >Products List</Link>
    </>
        ;
}