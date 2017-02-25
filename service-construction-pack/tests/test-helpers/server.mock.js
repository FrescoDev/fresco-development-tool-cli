import * as chai from 'chai';

import chaiHttp from 'chai-http';
import server from '../../service-container/server';

chai.use(chaiHttp);
export default chai.request(server);