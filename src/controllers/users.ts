import express from 'express'
import { deleteUserById, getUserById, getUsers } from 'models/users';

export const getAllUsers=async(req:express.Request,res:express.Response)=>{

    try{

         const  allUsers= await getUsers()
         return res.status(200).json(allUsers)

    }


    catch(err){

        console.log(err);
       return res.sendStatus(400)
        
    }
}


export const deletedUsers=async(req:express.Request,res:express.Response)=>{

    try{

        const {id}=req.params

        const deletedUser= await deleteUserById(id)

        return res.status(200).json(deletedUser)

    }

    catch(err){

        console.log(err)
       return  res.sendStatus(400)
    }


}

export const updateUser=async(req:express.Request,res:express.Response)=>{

    try{

        const {id}=req.params
        const {username}=req.body

        if(!username){
            return  res.sendStatus(400)
        }

        const user = await getUserById(id)

          user.username=username

          await user.save()

          return res.status(200).json(user).end()


    }

    catch(err){

        console.log(err)
       return  res.sendStatus(400)
    }
}