import Link from "next/link";

export default function Blog(){
return <>
<h3>My Blog</h3>
<Link href={'/'} >Home</Link>
<Link href={'/products'} >Products</Link>
</>;
}