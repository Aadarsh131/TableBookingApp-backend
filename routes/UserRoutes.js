import { jwtCheck, jwtParse } from "../middlewares/auth"
import UserController from "../controllers/UserController"

const router = Express.Router()
router.get('/', jwtCheck, jwtParse, UserController.getUser)
router.post('/', jwtCheck, UserController.createUser)

export default router