const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth') //instead of using other middleware like passport

// Item Model
const Item = require('../models/Item')

// since I am using Router instead of using app.get() in sever.js
router.get('/', (req, res) => {
    Item.find({},  (err, foundItems) => {
        res.send(foundItems)
    }).sort({date: -1})
})

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(item => {
        res.json(item)
    })
})
router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err) =>{
        if(err){
            // note res.json works very similar to res.send, I only used it because of the tutorial
            res.json({success: false}).status(404)
        }
        console.log("An item has been deleted Successfully")
        res.json({success: true})
    })
})
module.exports = router