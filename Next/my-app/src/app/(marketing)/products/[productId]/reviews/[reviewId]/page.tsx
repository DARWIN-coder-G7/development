import { notFound } from "next/navigation";

function getRandomInt(count: number) {
    return Math.floor(Math.random() * count);
}

export default async function Review(
    { params }: { params: Promise<{ productId: string; reviewId: string }> }
) {

    const random = getRandomInt(2);
console.log('Rnadom',random);
    if (random == 1) {
        throw new Error(`Error Loading review for this User Please try any other Review made by anyone else ${random}`);
    }

    const Id = (await params).reviewId;
    if (Number.parseInt(Id) > 1000) {
        notFound();
    }

    return <>
        <h1 className="xl" >Here You can See and verify the Review whichever is made by users {Id}</h1>
    </>;
}

// We can also get the Product Id  if we Needed