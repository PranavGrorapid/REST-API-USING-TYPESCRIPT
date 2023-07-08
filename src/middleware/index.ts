import express from 'express'
import {get,merge} from 'lodash'
import { getUserBySessionToken } from 'models/users'



export const isAuthenticated=(req:express.Request,res:express.Response,next:express.NextFunction)=>{

try{

     const sessionToken=req.cookies['REST']

     if(!sessionToken){

        return   res.sendStatus(403)
     }

     const ExistingUser=getUserBySessionToken(sessionToken)

     if(!ExistingUser){

        return   res.sendStatus(403)
     }

     merge(req,{identity:ExistingUser})

    return next()

}

catch(err){

    console.log(err)
   return  res.sendStatus(400)
}



}


export const isOwner=(req:express.Request,res:express.Response,next:express.NextFunction)=>{

    try{

        const {id}=req.params

         const currentUserId= get(req,'identity._id') as string

         if(!currentUserId){

            return  res.sendStatus(400)
         }

         if(currentUserId!==id){

           return  res.sendStatus(403)
         }

         next()

    }

    catch(err){

        console.log(err)
       return  res.sendStatus(400)
    }
}