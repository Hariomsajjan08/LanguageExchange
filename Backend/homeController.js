import { createConnectionObject } from "./DBConnection.js";
const connection = createConnectionObject();

export function getAllUsers (req,res){
    const fetchQuery = 'select * from users';
    connection.query(fetchQuery,(error,result)=>{
        try{
            if(error){
                console.log(error);
                res.status(500).send({message:"error while fetching data from database !"});
            }
            else{
                res.status(201).send(result);
            }
        }
        catch(error){
            console.log(error);
            res.status(500).send({message:"Something went wrong"});
        }
    });
    
}