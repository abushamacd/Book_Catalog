import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { createOrderService, getOrdersService } from './order.services'
import { Order } from '@prisma/client'

export const createOrder = tryCatch(async (req: Request, res: Response) => {
  const result = await createOrderService(req.user?.id, req.body)
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Order successfully',
    data: result,
  })
})

export const getOrders = tryCatch(async (req: Request, res: Response) => {
  const result = await getOrdersService()

  sendRes<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched  successfully',
    data: result,
  })
})
