const router = require('express').Router();
const homeController = require('../controllers/homeController');


//GET

router.get('/', homeController.homeShow);
router.post('/basvur', homeController.bilgiler);


module.exports = router;