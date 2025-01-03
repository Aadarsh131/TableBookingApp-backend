import { jwtCheck, jwtParse } from "../middlewares/auth"
import UserController from "../controllers/UserController"
import validateUser from "../middlewares/validate"

const router = Express.Router()
router.get('/', jwtCheck, jwtParse, UserController.getUser)
router.post('/', jwtCheck, validateUser, UserController.createUser)

export default router