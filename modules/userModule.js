const dbModule = require('./dbModule')
const {getCollection,toObjectId} = dbModule

const collectionName = "users" //!no syntax errors!

async function getusers(){
    try {
        const collection = await getCollection(collectionName)
        const users = await collection.find().toArray()
        if (!users || users.length === 0) return null
        return users
    } catch (error) {
        console.log(error)
    }
}
async function createuser(user){
    try {
        const collection = await getCollection(collectionName)
        const result = await collection.insertOne(user)
        console.log(result)
        return result
    } catch (error) {
        console.log("failed creating" + error)
        throw error
    }
}
async function removeuser(userId){
    try {
        const collection = await getCollection(collectionName)
        await collection.deleteOne({_id:toObjectId(userId)})
    } catch (error) {
        throw error
    }
}
async function updateuser(userId,updates){
    try {
        const collection = await getCollection(collectionName)
        const updatedResult = await collection.updateOne(
            {_id:toObjectId(userId)},
            {$set: updates}// {all the keys of user}
        )
        if (updatedResult.matchedCount ===0) throw new Error("user not found")
        return {success:true,message: "user updated successfully"}
    } catch (error) {
        console.log(error)
        throw error
    }
}
async function getOneById(userId){
    try {
        const collection = await getCollection(collectionName)
        const user = await collection.findOne({_id:toObjectId(userId)})
        if (!user) throw new Error("user not found")
        return user
    } catch (error) {
        console.log(error)
        throw error
    }
}
module.exports = {getusers,createuser,removeuser,updateuser,getOneById}