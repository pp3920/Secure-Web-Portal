const router =
require("express").Router();

const passport =
require("passport");

const User =
require("../../models/User");

const {
  signToken,
} = require("../../utils/auth");


router.post(
"/register",
async (req, res) => {

try {

const {
username,
email,
password
} = req.body;

const existingUser =
await User.findOne({
email
});

if (existingUser) {

return res.status(400)
.json({
message:
"User already exists"
});
}

const newUser =
await User.create({

username,
email,
password
});

res.status(201)
.json(newUser);

}
catch (error) {

res.status(500)
.json(error);

}
});


router.post(
"/login",
async (req, res) => {

try {

const {
email,
password
} = req.body;

const user =
await User.findOne({
email
});

if (!user) {

return res.status(400)
.json({
message:
"Incorrect email or password"
});
}

const correctPassword =
await user
.isCorrectPassword(
password
);

if (!correctPassword) {

return res.status(400)
.json({
message:
"Incorrect email or password"
});
}

const token =
signToken(user);

res.json({
token,
user
});

}
catch (error) {

res.status(500)
.json(error);

}
});


//git hub login route
router.get(

"/auth/github",

passport.authenticate(
"github",
{
scope:
["user:email"]
}
)

);

//github call back

router.get(

"/auth/github/callback",

passport.authenticate(
"github",
{
session:false
}
),

(req,res)=>{

const token =
signToken(
req.user
);

res.json({

message:
"GitHub Login Success",

token,

user:
req.user

});

}
);


//export

module.exports = router;