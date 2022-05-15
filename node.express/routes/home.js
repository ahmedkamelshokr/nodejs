const express = require("express");
const router = express.Router();

//app root
router.get("/", (req, res) => {
    // res.send("Hello world");
    res.render('index',{appTitle:'Node js demo', message:'Hello world!!'});
   });

   module.exports = router;