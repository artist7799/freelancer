import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import { User } from '../models/User';

const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/arunanandedtech_test';

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(MONGODB_TEST_URI);
});

afterAll(async () => {
  // Clear and disconnect
  await User.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Authentication Flow Integration Tests', () => {
  const testUser = {
    fullName: 'Test Student',
    email: 'teststudent@gmail.com',
    phone: '9876543210',
    password: 'TestPassword@123',
  };

  it('should successfully register a new user with unverified status and send OTP', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toContain('Registration successful');
    expect(res.body.data.email).toBe(testUser.email);
    expect(res.body.data.isVerified).toBe(false);

    // Verify user created in DB
    const dbUser = await User.findOne({ email: testUser.email });
    expect(dbUser).toBeDefined();
    expect(dbUser!.isVerified).toBe(false);
    expect(dbUser!.otp).toBeDefined();
    expect(dbUser!.otp).toHaveLength(6);
  });

  it('should verify OTP and activate user account', async () => {
    // 1. Register first
    await request(app).post('/api/auth/register').send(testUser);
    
    // Retrieve OTP from DB
    const dbUser = await User.findOne({ email: testUser.email });
    const otp = dbUser!.otp;

    // 2. Verify OTP
    const res = await request(app)
      .post('/api/auth/verify-otp')
      .send({
        email: testUser.email,
        otp,
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.data.user.isVerified).toBe(true);

    // Verify activated status in DB
    const updatedUser = await User.findOne({ email: testUser.email });
    expect(updatedUser!.isVerified).toBe(true);
    expect(updatedUser!.otp).toBeNull();
  });

  it('should fail verification with incorrect OTP', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const res = await request(app)
      .post('/api/auth/verify-otp')
      .send({
        email: testUser.email,
        otp: '000000', // incorrect OTP
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Invalid or expired OTP');
  });

  it('should login verified user and return tokens', async () => {
    // 1. Register and verify
    await request(app).post('/api/auth/register').send(testUser);
    const dbUser = await User.findOne({ email: testUser.email });
    dbUser!.isVerified = true;
    dbUser!.otp = null;
    await dbUser!.save();

    // 2. Login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.data.user.email).toBe(testUser.email);
  });

  it('should reject login for unverified user', async () => {
    // Register only (unverified by default)
    await request(app).post('/api/auth/register').send(testUser);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(res.status).toBe(403);
    expect(res.body.message).toContain('not been verified yet');
  });
});
