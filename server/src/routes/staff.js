import express from "express";
import {staffSignup,staffLogin, findStudent, markIndoorAttendance, fetchIndoorAttendance, markGymAttendance, fetchGymAttendance, addEquipment, getEquipments, updateEquipment, deleteEquipment, getOrders, addAnnouncement, deleteAnnouncement, getAnnouncements, bookedSlots, changeStatus} from "../../helpers/staff-helpers.js"
import multer from "multer"
import { staffAuth } from "../../middlewares/staffAuth.js";
var router = express.Router()

//multer middleware for fileupload
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      return callback(null, "./public/images")
    },
    filename: function (req, file, callback) {
        req.body.file = file.datetime
      return callback(null, `${file.originalname}`)
    }
  })

  const announcementStorage = multer.diskStorage({
    destination: function(req, file, callback) {
      return callback(null, "./public/announcements")
    },
    filename: function (req, file, callback) {
        req.body.file = file.datetime
      return callback(null, `${file.originalname}`)
    }
  })

  const upload = multer({storage})
  const announcementUpload = multer({storage : announcementStorage})
  //multer ends

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

router.post('/addEquipment', upload.single('file'), async (req,res)=>{
    try {
        delete req.body.file;
        const filename = req.file.originalname;
        await addEquipment({...req.body,filename}).then((result)=>{
            res.json(result)
        })
    } catch (error) {
        console.error(error);
    }
})

router.post('/updateEquipment', async (req,res)=>{
    try{
        const result = await updateEquipment({...req.body});
        res.json(result)
    }
    catch (error){
        console.error(error);
    }
})

router.post('/deleteEquipment',async (req,res)=>{
    try {
        const result = await deleteEquipment({...req.body});
        res.json(result)
    } catch (error) {
        console.error(error);
    }
})

router.get('/getEquipments', async (req,res)=>{
    try {
        const result = await getEquipments();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
})

router.get('/orders',staffAuth, async (req,res)=>{
    try {
        const result = await getOrders();
        res.json(result)
    } catch (error) {
        console.error(error);
    }
})

router.post('/addAnnouncement', staffAuth, announcementUpload.single('file'), async (req,res)=>{
    try {
        delete req.body.file;
        const filename = req.file.originalname;
        await addAnnouncement({...req.body,filename}).then((result)=>{
            res.json(result)
        })
    } catch (error) {
        console.error(error);
    }
})

router.post('/deleteAnnouncement', staffAuth,async (req,res)=>{
    try {
        const result = await deleteAnnouncement({...req.body});
        res.json(result)
    } catch (error) {
        console.error(error);
    }
})

router.get('/getAnnouncements', staffAuth, async (req,res)=>{
    try {
        const result = await getAnnouncements();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
})

router.get('/bookedSlots', staffAuth, async (req,res)=>{
    try {
        const result = await bookedSlots();
        res.json(result);
    } catch (error) {
        console.error(error);
    }
})

router.post('/changeStatus', staffAuth, async (req,res)=>{
    console.log(req.body);
    const result = await changeStatus({...req.body});
    res.json(result);
})

export default router;