const router = require('express').Router();
const adminController = require('../controllers/adminController');
const validetorMiddleware = require('../middlewares/validationMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/*get*/   
router.get('/', authMiddleware.oturumAcilmis, adminController.showHomePage);
router.get('/category/:category',authMiddleware.oturumAcilmis, adminController.showCategoryPage)

router.get('/ele',adminController.ele)
router.get('/sonraki',adminController.sonrakiasama)
router.get('/atla',adminController.atla)


module.exports = router;