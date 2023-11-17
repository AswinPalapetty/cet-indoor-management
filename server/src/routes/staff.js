import express from "express";
import {staffSignup,staffLogin, findStudent, markIndoorAttendance, fetchIndoorAttendance, markGymAttendance, fetchGymAttendance} from "../../helpers/staff-helpers.js"

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

router.get('/findStudent/:admission', async (req,res)=>{
    try{
        const result = await findStudent(req.params.admission);
        res.json(result)
    }catch (error){
        console.error(error);
    }
})

router.post('/markIndoorAttendance', async (req,res)=>{
    try{
        const result = await markIndoorAttendance(req.body);
        res.json(result)
    }
    catch (error){
        console.error(error);
    }
})

router.get('/fetchIndoorAttendance', async (req,res)=>{
    try {
       const result = await fetchIndoorAttendance();
       res.json(result);

    } catch (error) {
        console.error(error);
    }
})

router.post('/markGymAttendance', async (req,res)=>{
    try{
        const result = await markGymAttendance(req.body);
        res.json(result)
    }
    catch (error){
        console.error(error);
    }
})

router.get('/fetchGymAttendance', async (req,res)=>{
    try {
       const result = await fetchGymAttendance();
       res.json(result);

    } catch (error) {
        console.error(error);
    }
})

export default router;