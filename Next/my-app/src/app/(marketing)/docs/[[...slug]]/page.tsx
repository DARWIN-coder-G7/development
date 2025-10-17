export default async function Docs(
    {params}:{params:Promise<{slug:string[]}>;}
){
    const {slug} = await params ;
    return <h5>This is Docs Page{slug}</h5>
}