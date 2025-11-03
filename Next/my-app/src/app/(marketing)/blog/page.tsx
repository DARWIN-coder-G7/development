import Link from "next/link";

export default function Blog(){
return <>
<h3>My Blog</h3>
<div className="flex justify-around bg-cyan-300 p-1.5 rounded-xl ">
    <Link href={'blog/first'} >First</Link>
    <Link href={'blog/second'} >second</Link>
</div>
<Link href={'/'} >Home</Link>
<Link href={'/products'} >Products</Link>
</>;
}