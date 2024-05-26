const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/UserSchema')
const Info = require('../models/InfoSchema')

// desc: register/signup new user , route: POST /api/users/register , access: public, request: POST
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, number, address, gender, age, username, password } =
    req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }

  // if user already exits then throw error
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    number,
    address,
    gender,
    age,
    username,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('user data is invalid')
  }
})

// desc: login existing user , route: POST /api/users/login , access: public, request: POST
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('All fiels are mandatory')
  }

  const user = await User.findOne({ email })
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '24h',
      }
    )
    res.status(200).json({
      accessToken,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('email or password is not valid')
  }
})

// desc: get current user information , route: GET /api/users/currentuser , access: private, request: GET
const currentUser = asyncHandler(async (req, res) => {
  // remember, vlidateTokenHandler middleware is working here first
  res.status(200).json(req.user)
})

// desc: get unique plant information , route: POST /api/users/getinfo , access: public, request: POST
const getInfo = asyncHandler(async (req, res) => {
  const { uniqueId } = req.body

  const info = await Info.findOne({ uniqueId })

  if (info) {
    res.status(200).json({
      _id: info.id,
      uniqueId: info.uniqueId,
      description: info.description,
    })
  } else {
    res.status(400)
    throw new Error('user data is invalid')
  }
})

// desc: post unique plant information , route: POST /api/users/info , access: public, request: POST
const postInfo = asyncHandler(async (req, res) => {
  const { uniqueId, description } = req.body

  const info = await Info.create({
    uniqueId,
    description,
  })

  if (info) {
    res.status(201).json({
      _id: info.id,
      uniqueId: info.uniqueId,
      description: info.description,
    })
  } else {
    res.status(400)
    throw new Error('user data is invalid')
  }
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  postInfo,
  getInfo,
}
