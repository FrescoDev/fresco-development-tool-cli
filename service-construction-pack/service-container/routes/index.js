require('babel-polyfill');
import MetaHandler from '../http-request-handlers/meta.handler';
import {Router} from 'express';
import correspondent from '../../facebook-correspondance-service';

const routes = new Router();

routes.use('/inbox', correspondent.router());
routes.get('/meta', MetaHandler.index);

export default routes;
