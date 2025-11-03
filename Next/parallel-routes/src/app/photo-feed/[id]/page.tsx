import wondersImages, { WonderImage } from "../images";
import Image from "next/image";

export default async function PhotoPage({params}:{params:Promise<{id:string}>}){
const {id} = await params;
const photo:WonderImage = wondersImages.find(item => item.id===id)!;
return(
<div className="container mx-auto my-10 " >
    <div className="w-1/2 mx-auto" >
        <div>
            <h1 className="text-center text-3xl font-bold my-4" >
                {photo.name}
            </h1>
        </div>
        <Image alt={photo.name} src={photo.src}
         width={1000}
         height={800}
        className="w-full object-cover aspect-square" >
        </Image>
        <div className="bg-white py-4">
            <h4>{photo.photographer}</h4>
            <h4>{photo.location}</h4>
        </div>
    </div>
</div>
)
}