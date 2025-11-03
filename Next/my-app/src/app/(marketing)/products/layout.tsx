function getRandomInt(count: number) {
    return Math.floor(Math.random() * count);
}
export default function ProductDetailsLayout(
    {children}:{children:React.ReactNode}
){
 const random = getRandomInt(2);
console.log('Rnadom',random);
    if (random == 1) {
        throw new Error(`Error in PDP Page ${random}`);
    }
  
return (
<>
{children}
<h2>Featured Products Component</h2>
</>
);
}