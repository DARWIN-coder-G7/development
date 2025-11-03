import Link from "next/link";

export default function Home(){
    return <>
    <div className="bg-blue-500 text-white p-4 text-center">Welcome Home!</div>
    <div className="flex justify-around p-4 ">
    <Link className="font-bold text-blue-500 underline " href={'/blog'} >Blog</Link>
    <Link className="font-bold text-blue-500 underline "  href={'/docs'} >Docs</Link>
    <Link className="font-bold text-blue-500 underline "  href={'/order-product'} >Order</Link>
    <Link className="font-bold text-blue-500 underline "  href='/articles/breaking-news-123?lang=en' >Articles English</Link>
    <Link className="font-bold text-blue-500 underline "  href='/articles/breaking-news-123?lang=fr' >Articles French</Link>
    <Link className="font-bold text-blue-500 underline "  href='/photo-feed' >Photos</Link>
    </div>

    </>;
    
}