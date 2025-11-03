import Modal from "@/components/modal";
import wondersImages, { WonderImage } from "../../images";
import Image from "next/image";

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const photo: WonderImage = wondersImages.find(item => item.id === id)!;
    console.log("Hey Am  I getting called", id, "///", photo);
    return (
        <Modal >
            <div className="p-3 bg-yellow-100 " >
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
                <div className="bg-cyan-300 text-blue-800 p-4">
                    <h4>{photo.photographer}</h4>
                    <h4>{photo.location}</h4>
                </div>
            </div>
        </Modal>
    )
}