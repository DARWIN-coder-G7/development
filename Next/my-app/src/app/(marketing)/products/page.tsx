import Link from "next/link";

export const metadata = {
    title: {
        absolute: "Title Overriden By template"
    },
    description: 'Product Listing Page',
}
export default function ProductList() {
    return <>
        <h1>Product List</h1>
        <h2>
            <Link href={'/'} >Home</Link>
        </h2>
        <ul>
            <li>
                <Link href={'/products/1'} >
                    Product 001
                </Link>
            </li>
            <li> <Link href={'/products/2'} >
                Product 002
            </Link></li>
            <li> <Link href={'/products/3'} replace >
            when we use browser back it will land on prev url instead of Product List Because of replace directive
                Product 003
            </Link></li>
        </ul>
    </>;
}