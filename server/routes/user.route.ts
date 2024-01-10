import express from "express"
import {
  activateUser,
  getUserInfo,
  login,
  logout,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller"
import { authorizeRoles, isAuthenticated } from "../middleware/auth"

const userRouter = express.Router()

userRouter.post("/registration", registrationUser)
userRouter.post("/activate-user", activateUser)
userRouter.post("/login", login)
userRouter.get("/logout", isAuthenticated, authorizeRoles("user"), logout)
userRouter.get("/refresh-token", updateAccessToken)
userRouter.get("/me", isAuthenticated, getUserInfo)
userRouter.post("/social-auth", socialAuth)
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo)
userRouter.put("/update-user-password", isAuthenticated, updatePassword)
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture)

export default userRouter
