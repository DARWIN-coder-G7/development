import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/users', async (_, res) => {
    // findFirst()  will return null if no data 
    // findFirstOrThrow() will throw errr if no data
    // findMany()  will fetch all from table
    // findUnique()  to fetch unique data from the table by column name
    const users = await prisma.user.findMany({
        where: {
            //========== greater than  less than 
            // isMarried:true,age:{gt:30}
            //========== or operator
            // OR:[
            //     {nationality:'Brazilian'},
            //     {age:{gte:30}}
            // ]
            // AND:[]
            //===========Not A brazilian
            // nationality:{not:'Brazilian'}
            // =============== or condition to same column
            // OR:[
            //     {nationality:'Irish'},
            //     {nationality:'German'},
            //     {nationality:'Portuguese'},
            // ],
            //======= have an alternate way to do the above one
            // nationality: {
            //     in: ['Irish', 'German', 'Portuguese']
            // }
        }
    });
    res.json(users);
});

app.put('/users',async(_,res)=>{
updateEndUser(res);
});
app.delete('/users',async(_,res)=>{
deleteUser(res);
});

app.listen(4000, () => { console.log("Server started and Running successfully on port number: 4000") });

async function updateEndUser(res:any){
const updatedUser = await prisma.user.update({
    where:{email:'pedro@example.com'},
    data:{name:'pedro dom'}

});
res.json(updatedUser);
}

async function deleteUser(res:any){
const deletedUser = await prisma.user.deleteMany({
    where:{
        age:{gte:30}
    }
});
// returns count of how many rows got deletedUser{
//   "count": 1
// }
res.json(deletedUser);
}