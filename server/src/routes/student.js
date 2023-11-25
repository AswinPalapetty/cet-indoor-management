import express from "express"
import { addToCart, confirmOrder, deleteItem, getCartItems, getEquipments, getOrders, makePayment, verifySignature, studentLogin, studentSignup, updateCartQuantity } from "../../helpers/student-helpers.js";
import { studentAuth } from "../../middlewares/studentAuth.js";
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ "name": "aswin" })
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

router.get('/getEquipments', async (req, res) => {
  try {
    const result = await getEquipments();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
})

router.post('/addToCart', async (req, res) => {
  try {
    const result = await addToCart(req.body.equipmentId, req.body.userId);
    res.json(result)

  } catch (error) {
    console.error(error);
  }
})

router.get('/getCartItems', studentAuth, async (req, res) => {
  try {
    const result = await getCartItems(req.student._id);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

router.post('/deleteItem', studentAuth, async (req, res) => {
  try {
    const result = await deleteItem(req.body.cartItemId);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

router.put('/updateQuantity/:equipmentId', studentAuth, async (req, res) => {
  try {
    const result = await updateCartQuantity(req.params.equipmentId, req.body.quantity, req.student._id);
    console.log(result);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})


router.post('/confirmOrder', studentAuth, async (req, res) => {
  try {
    const result = await confirmOrder({ ...req.body, user: req.student._id })
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

router.get('/orders', studentAuth, async (req, res) => {
  try {
    const result = await getOrders(req.student)
    res.json(result)
  } catch (error) {
    console.error(error);
  }
})

router.post("/makePayment", studentAuth, async (req, res) => {
  try {
    const result = await makePayment(req.student._id, req.body.orderId, req.body.equipmentId)
    res.json(result);
  } catch (error) {
    res.json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

router.post("/verifySignature", studentAuth, async (req, res) => {
  try {
    const result = await verifySignature(req.student._id, req.body.razorpay_order_id, req.body.razorpay_payment_id, req.body.razorpay_signature);
    res.json(result)
  } catch (error) {
    console.error(error);
  }
});

export default router;