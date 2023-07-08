



import express from 'express'
import { authentication, random } from 'helpers';

import { createUser, getUserbyEmail } from "models/users";



export const register = async (req: express.Request, res: express.Response) => {
  try {

    
    const { username, email, password } = req.body;

    if (!username || !email || password) {
      return res.sendStatus(400);
    }

    const ExistingUser = await getUserbyEmail(email);

    if (ExistingUser) {
      return res.sendStatus(400);
    }
    const salt = random();

    const user = await createUser({
      username,
      email,
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};


export const login=async(req:express.Request,res:express.Response)=>{

    try{

    const {email,password}=req.body


     const user= await getUserbyEmail(email).select('+authentication.salt+authentication.password')

     if(!user){

        res.sendStatus(400)
     }

       const passwordTobeMatched=authentication(user.authentication.salt,password)

       if(passwordTobeMatched!==user.authentication.password){

        res.sendStatus(400)
       }

       let salt=random()

       user.authentication.sessionToken=authentication(salt,user._id)


    
  await user.save()

  res.cookie('REST',user.authentication.sessionToken)

    }

    catch(err){

        console.log(err)
        res.sendStatus(400)
    }




}
