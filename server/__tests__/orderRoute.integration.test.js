const supertest = require('supertest');
const { app } = require('../index.js');

const accessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRjZTk3ZmM5Mzc0NmNjMjNhZTFjNDAiLCJpYXQiOjE3MDA1NDQ4NTB9.Fyo1TXPZdrjFoZaA4dSKisMQyHpIQ95vmFKzUufcvlE';

const labaccessToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRmYzIyM2M5Mzc0NmNjMjNhZTFlYWUiLCJpYXQiOjE3MDA1NjAxMDl9._p47qk6UH5P_0AIpXrmZs4ocMYbJtIauACC1xr_D6VU';

describe('GET /orderbyId/56083_1', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/orderbyId/56083_1')
      .set('Authorization', accessToken);

    expect(response.status).toBe(200);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/orderbyId/56083_1');
    expect(response.status).toBe(401);
  });
});

describe('GET /getallorders', () => {
  beforeEach(() => {
    // const mockCheckAuthentication = jest.fn((req, res, next) => {
    //   console.log(' check auth func mock');
    //   req.currentUser = {
    //     typeOfUser: 'customer',
    //   };
    // });
    // const mockCustomer = jest.fn((req, res, next) => {
    //   console.log('customer func mock');
    //   mockCheckAuthentication(req, res, next);
    //   next();
    // });
    // // Mock the database function
    // const mockGetAllOrders = jest.fn(() => [
    //   { id: 1, product: 'Product 1', quantity: 2 },
    //   { id: 2, product: 'Product 2', quantity: 1 },
    // ]);
    // // Replace the actual functions with the mock functions
    // jest.mock('../middlewares/auth', () => ({
    //   checkAuthentication: mockCheckAuthentication,
    // }));
    // jest.mock('../middlewares/auth', () => ({
    //   customer: mockCustomer,
    // }));
    // jest.mock('../controllers/order.controller', () => ({
    //   getAllOrders: mockGetAllOrders,
    // }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all orders for authenticated customer', async () => {
    // const response = await supertest(app)
    //   .set('Authorization', `Bearer ${accessToken}`)
    //   .get('/getallorders')
    //   .expect(200);

    // expect(mockGetAllOrders).toHaveBeenCalled();

    // expect(response.body).toEqual([
    //   { id: 1, product: 'Product 1', quantity: 2 },
    //   { id: 2, product: 'Product 2', quantity: 1 },
    // ]);

    const response = await supertest(app)
      .get('/getallorders')
      .set('Authorization', accessToken);

    expect(response.status).toBe(200);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/order/latestOrder');
    expect(response.status).toBe(401);
  });

  // it('should return 401 for unauthenticated request', async () => {
  //   // Mock the authentication function
  //   // const mockCheckAuthentication = jest.fn((req, res) => {
  //   //   console.log('check auth mock 2');
  //   //   res.status(401).send({ errorMessage: 'Unauthorized Request' });
  //   // });

  //   // jest.mock('../middlewares/auth', () => ({
  //   //   checkAuthentication: mockCheckAuthentication,
  //   // }));

  //   const response = await supertest(app).get('/getallorders').expect(401);

  //   expect(response.body).toEqual({ errorMessage: 'Unauthorized Request' });
  // });
});

describe('GET /order/latestOrder', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/order/latestOrder')
      .set('Authorization', accessToken);

    expect(response.status).toBe(200);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/order/latestOrder');
    expect(response.status).toBe(401);
  });
});

describe('GET /orderbyCustomer/', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/orderbyCustomer/')
      .set('Authorization', accessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/orderbyCustomer/');
    expect(response.status).toBe(401);
  });
});

describe('GET /orderforLab/', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/orderforLab/')
      .set('Authorization', labaccessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/orderforLab/');
    expect(response.status).toBe(401);
  });
});
describe('GET /orderOneWeek/', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/orderOneWeek/')
      .set('Authorization', labaccessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/orderOneWeek/');
    expect(response.status).toBe(401);
  });
});

describe('GET /order/paid', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .put('/order/paid')
      .set('Authorization', accessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).put('/order/paid');
    expect(response.status).toBe(401);
  });
});

describe('GET /order/unpaid', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .delete('/order/unpaid')
      .set('Authorization', accessToken);

    expect(response.status).toBe(204);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).delete('/order/unpaid');
    expect(response.status).toBe(401);
  });
});

describe('GET /order/approved', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/order/approved')
      .set('Authorization', labaccessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/order/approved');
    expect(response.status).toBe(401);
  });
});

describe('GET /order/56083_1', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .put('/order/56083_1')
      .set('Authorization', labaccessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).put('/order/56083_1');
    expect(response.status).toBe(401);
  });
});

describe('POST /generateOrderId', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .post('/generateOrderId')
      .set('Authorization', accessToken);

    expect(response.status).toBe(200);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).post('/generateOrderId');
    expect(response.status).toBe(401);
  });
});

describe('POST /order', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .post('/order')
      .set('Authorization', accessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).post('/order');
    expect(response.status).toBe(401);
  });
});

describe('PUT /orderUpdate/56083_1', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .put('/orderUpdate/56083_1')
      .set('Authorization', labaccessToken);

    expect(response.status).toBe(201);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).put('/orderUpdate/56083_1');
    expect(response.status).toBe(401);
  });
});
describe('GET /orderCountByProductCategory', () => {
  it('responds with 200 and the expected data', async () => {
    const response = await supertest(app)
      .get('/orderCountByProductCategory')
      .set('Authorization', labaccessToken);

    expect(response.status).toBe(200);
  });

  it('responds with 401 if not authenticated', async () => {
    const response = await supertest(app).get('/orderCountByProductCategory');
    expect(response.status).toBe(401);
  });
});
