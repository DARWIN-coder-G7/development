import Link from "next/link";
import { use } from "react";

// Server Side Approach
// For using params in Client side we have to rely on Use hook from React

// export default async function NewsArticle({params , searchParams}:{
//     params:Promise<{articleid:string}>,
//     searchParams: Promise<{lang?:"en"|"es"|"fr"}>
// }){
//     const {articleid } = await params ;
//     const {lang="en"} = await searchParams;
// return <>
// <div>
//     <h1>News Article {articleid}</h1>
//     <p>Reading in {lang}</p>
//     <div className="flex justify-around" >
//         <Link className="font-sans bg-blue-300 text-center text-cyan-950 p-2 rounded-full "
//          href={`${articleid}?lang=en`} >English</Link>
//         <Link className="font-sans bg-amber-200 text-center text-shadow-blue-800 p-2 rounded-full " 
//         href={`${articleid}?lang=fr`} >French</Link>
//         <Link className="font-sans bg-fuchsia-400 text-center text-shadow-blue-800 p-2 rounded-full "
//          href={`${articleid}?lang=es`}>Spanish</Link>
//     </div>
// </div>
// </>
// }

// async await for server components To access params and search params (query params)
// use hook for client side components

// page.tsx will have both params and query params but layout.tsx is having acces for params only 

export default  function NewsArticle({params , searchParams}:{
    params:Promise<{articleid:string}>,
    searchParams: Promise<{lang?:"en"|"es"|"fr"}>
}){
    const {articleid } = use(params);
    const {lang="en"} =  use(searchParams);
return <>
<div>
    <h1>News Article {articleid}</h1>
    <p>Reading in {lang}</p>
    <div className="flex justify-around" >
        <Link className="font-sans bg-blue-300 text-center text-cyan-950 p-2 rounded-full "
         href={`${articleid}?lang=en`} >English</Link>
        <Link className="font-sans bg-amber-200 text-center text-shadow-blue-800 p-2 rounded-full " 
        href={`${articleid}?lang=fr`} >French</Link>
        <Link className="font-sans bg-fuchsia-400 text-center text-shadow-blue-800 p-2 rounded-full "
         href={`${articleid}?lang=es`}>Spanish</Link>
    </div>
</div>
</>
}