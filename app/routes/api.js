import { Router } from "express";
import LoginController from "../controllers/logincontroller.js";
import ProfileController from "../controllers/profilecontroller.js";
import StudenController from "../controllers/studentcontroller.js";
import AuthVerify from "../middleware/authverify.js";
import LoginRequest from "../requests/loginrequest.js";
import StudentRequest from "../requests/studentrequest.js";
import UserRequest from "../requests/userrequest.js";

const router = Router()

router.post('/register', LoginRequest.register, (new LoginController()).register)
router.post('/login', LoginRequest.login, (new LoginController()).login)

router.get('/profile/show', AuthVerify.auth, (new ProfileController()).show)
router.post('/profile/update', AuthVerify.auth, UserRequest.update, (new ProfileController()).update)
router.post('/change-password', AuthVerify.auth, UserRequest.changePassword, (new ProfileController()).changePassword)

router.get('/students', AuthVerify.auth, (new StudenController()).index)
router.post('/students', AuthVerify.auth, StudentRequest.register, (new StudenController()).store)
router.put('/students/:studentId/update', AuthVerify.auth, StudentRequest.register, (new StudenController()).update)
router.get('/students/:studentId', AuthVerify.auth, (new StudenController()).show)
router.delete('/students/:studentId', AuthVerify.auth, (new StudenController()).destroy)

export default router