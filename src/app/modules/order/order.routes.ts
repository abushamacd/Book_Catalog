import express from 'express'
import { auth } from '../../../middleware/auth'
import { createOrder, getOrder, getOrders } from './order.controllers'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

// example route
router.route('/create-order').post(auth(ENUM_USER_ROLE.CUSTOMER), createOrder)

router
  .route('/')
  .get(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), getOrders)

router
  .route('/:orderId')
  .get(auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER), getOrder)

export default router
