import express from "express"
import { getEquipments, studentLogin, studentSignup } from "../../helpers/student-helpers.js";
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res,next){
  res.json({"name":"aswin"})
})

router.post('/signup', async (req, res) => {
  try {
    const result = await studentSignup(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await studentLogin(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
  }
});

router.get('/getEquipments', async (req,res)=>{
  try {
      const result = await getEquipments();
      res.json(result);
  } catch (error) {
      console.error(error);
  }
})

export default router;