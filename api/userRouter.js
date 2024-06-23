const express = require("express")
const {getusers,createuser,removeuser,updateuser,getOneById} = require("../modules/userModule")
const router = express.Router()

router.get("/",async (req,res)=>{
    try {
        const users = await getusers()
        res.json(users)
    } catch (error) {
        res.status(500).send({message:error.message || "internal Server Error"})
    }
})
router.get("/:userId",async(req,res)=>{
    try {
        const user = await getOneById(req.params.userId)
        res.json(user)
    } catch (error) {
        res.status(500).send({message:error.message || "internal Server Error"})
    }
})
router.post("/", async (req, res) => {
    try {
      const user = req.body; // Assuming the user data is directly in the body
      const newuser = await createuser(user);
      res.status(201).json(newuser);
    } catch (error) {
      res.status(500).send({ message: error.message || "Internal Server Error" });
    }
  });
router.delete("/:userId", async (req, res) => {
    try {
      await removeuser(req.params.userId)
      res.status(200).send({ message: "user successfully deleted" })
    } catch (error) {
      res.status(500).send({ message: error.message || "Internal Server Error" })
    }
  })
  router.put("/:userId", async (req, res) => {
    try {
      const updates = req.body
      await updateuser(req.params.userId, updates)
      res.status(200).send({ message: "user updated successfully" })
    } catch (error) {
      res.status(500).send({ message: error.message || "Internal Server Error" })
    }
  })
  module.exports = router