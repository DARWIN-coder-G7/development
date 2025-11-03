export default async function FirstBlog(){
    const data:string = await new Promise((resolve)=>{setTimeout(()=>{resolve("Intentional Delay")},2000)})
    return <h4>My First Blog {data}</h4>;
}