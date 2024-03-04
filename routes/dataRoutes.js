const { Router } = require('express'); 

const dataController = require("../controllers/dataController");
const router = Router(); 
  
router.get('/getBooks',dataController.getBooks);
router.post('/checkout', dataController.checkout); 
router.post('/return', dataController.returnBook); 
router.post('/transactionDetails',dataController.transactionDetails);
  
module.exports = router;