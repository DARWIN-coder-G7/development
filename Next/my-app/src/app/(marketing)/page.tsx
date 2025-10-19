import Link from "next/link";

export default function Home(){
    return <>
    <div className="bg-blue-500 text-white p-4 text-center">Welcome Home!</div>
    <Link href={'/blog'} >Blog</Link>
    <Link href={'/docs'} >Docs</Link>
    </>;
    
}