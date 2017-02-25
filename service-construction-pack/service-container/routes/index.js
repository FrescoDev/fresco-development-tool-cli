import InboxHandler from '../http-request-handlers/inbox.handler.js'
import MetaHandler from '../http-request-handlers/meta.handler'
import { Router } from 'express'

const routes = new Router()

routes.post('/inbox', InboxHandler.index)
routes.get('/meta', MetaHandler.index)

export default routes
