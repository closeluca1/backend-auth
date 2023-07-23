import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const User = new mongoose.Schema({
  nick: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 3,
    unique: true,
    index: true,
    lowercase: true,
    select: true,
    match: /^[a-zA-Z0-9,_,.,]+$/
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
    minLength: 3
  },
  surname: {
    type: String,
    required: true,
    select: true,
    maxLength: 50,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    maxLength: 50,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])[@!#$%^&*()/\\a-zA-Z0-9]{8,}/
  },
  handleSignToken: {
    type: String,
    select: false,
    default: null
  },
  termscontract: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: String,
  },
  isActive: {
    type: Boolean,
    select: true,
    default: true
  },
});

User.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 15);
  this.password = hashedPassword;

  next();
});

export default mongoose.model('User', User);