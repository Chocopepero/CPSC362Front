import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  address: {
    street_name: String,
    city: String,
    state: String,
    postal_code: String,
    country: String
  }
}, { collection: 'User_Account' });

const reservationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  numAdults: Number,
  numChildren: Number,
  numberRooms: Number,
  roomType: String,
  arrivalDate: String,
  departureDate: String,
  totalCost: Number
}, { collection: 'reservations' });

const User = mongoose.model('User_Account', userSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);

app.use(session({
  secret: process.env.SECRET_KEY || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    req.session.user = { email: user.email, name: user.name };
    res.json({ name: user.name });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/reserve', async (req, res) => {
  const { name, phone, numAdults, numChildren, numberRooms, roomType, arrivalDate, departureDate, totalCost } = req.body;
  try {
    const newReservation = new Reservation({
      name,
      phone,
      numAdults,
      numChildren,
      numberRooms,
      roomType,
      arrivalDate,
      departureDate,
      totalCost
    });
    const savedReservation = await newReservation.save();
    res.status(201).json({ message: 'Reservation created successfully', reservationId: savedReservation._id.toString() });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.get('/api/user', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/authenticate', async (req, res) => {
  if (req.session.user) {
    try {
      const user = await User.findOne({ email: req.session.user.email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ loggedIn: true, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.json({ loggedIn: false });
  }
});

app.get('/api/lookup', async (req, res) => {
  const { id } = req.query;
  try {
    const reservation = await Reservation.findOne({ _id: id });
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
