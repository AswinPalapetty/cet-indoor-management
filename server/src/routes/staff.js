import express from "express";
import {staffSignup,staffLogin} from "../../helpers/staff-helpers.js"

var router = express.Router()

router.post('/signup', async (req, res) => {
    try {
        const result = await staffSignup(req.body)
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

router.post('/login', async (req,res)=>{
    try{
        const result = await staffLogin(req.body)
        res.json(result);
    } catch (error) {
        console.error(error)
    }
});

export default router;