import { deletedUsers, getAllUsers, updateUser } from 'controllers/users'
import express from 'express'
import { isAuthenticated, isOwner } from 'middleware'

export default (router:express.Router)=>{

    router.get('/users',isAuthenticated,getAllUsers)
    router.delete('/users',isAuthenticated,isOwner,deletedUsers)
    router.patch('/users',isAuthenticated,isOwner,updateUser)
}