const router =
require("express").Router();

const Bookmark =
require("../../models/Bookmark");

const {
authMiddleware
} = require("../../utils/auth");


//CREATE

router.post(
"/",
authMiddleware,
async(req,res)=>{

const bookmark =
await Bookmark.create({

title:
req.body.title,

url:
req.body.url,

user:
req.user._id
});

res.json(bookmark);

});


//GET ALL

router.get(
"/",
authMiddleware,
async(req,res)=>{

const bookmarks =
await Bookmark.find({

user:
req.user._id
});

res.json(bookmarks);

});


//GET ONE

router.get(
"/:id",
authMiddleware,
async(req,res)=>{

const bookmark =
await Bookmark.findById(
req.params.id
);

if(!bookmark){

return res.status(404)
.json({
message:"Not found"
});
}

if(
bookmark.user.toString()
!== req.user._id
){

return res.status(403)
.json({
message:
"Forbidden"
});
}

res.json(bookmark);

});


//UPDATE

router.put(
"/:id",
authMiddleware,
async(req,res)=>{

const bookmark =
await Bookmark.findById(
req.params.id
);

if(
bookmark.user.toString()
!== req.user._id
){

return res.status(403)
.json({
message:
"Forbidden"
});
}

const updated =
await Bookmark
.findByIdAndUpdate(

req.params.id,

req.body,

{ new:true }

);

res.json(updated);

});


//DELETE

router.delete(
"/:id",
authMiddleware,
async(req,res)=>{

const bookmark =
await Bookmark.findById(
req.params.id
);

if(
bookmark.user.toString()
!== req.user._id
){

return res.status(403)
.json({
message:
"Forbidden"
});
}

await bookmark
.deleteOne();

res.json({
message:
"Bookmark Deleted"
});

});

//export 
module.exports = router;