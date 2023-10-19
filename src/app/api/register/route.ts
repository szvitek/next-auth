import User from '@/models/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import { type NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();

  await connect();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse('Email is already in use.', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse('user is registered', { status: 201 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
