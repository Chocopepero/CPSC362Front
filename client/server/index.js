import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 5000;

// Resolve the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "client/src/images" directory
app.use('/images', express.static(path.join(__dirname, '..', 'src', 'images')));

app.use(cors({
  origin: 'http://localhost:5174', // Allow requests from this origin
  credentials: true // Allow credentials
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(session({
  secret: process.env.SECRET_KEY || 'your_secret_key',
  resave: false,
  saveUninitialized: false, // Set to false to prevent uninitialized sessions
  cookie: { secure: false } // for HTTPS
}));

// Define schemas and models
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
  },
  role: { type: String, default: 'user' },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
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
  totalCost: Number,
  email: String
}, { collection: 'reservations' });

const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  link: String
}, { collection: 'rooms' });

const User = mongoose.model('User_Account', userSchema);
const Reservation = mongoose.model('Reservation', reservationSchema);
const Room = mongoose.model('Room', roomSchema);

app.post('/api/register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: 'user'
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

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
    req.session.user = { email: user.email, name: user.name, role: user.role }; // Ensure role is included
    res.json({ email: user.email, name: user.name, role: user.role }); // Ensure role is included
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/reserve', async (req, res) => {
  const { name, phone, numAdults, numChildren, numberRooms, roomType, arrivalDate, departureDate, totalCost, email } = req.body;
  console.log('Reservation request received:', req.body);

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
      totalCost,
      email
    });
    const savedReservation = await newReservation.save();
    console.log('Reservation saved:', savedReservation);

    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for email:', email);
      return res.status(404).json({ error: 'User not found' });
    }

    user.reservations.push(savedReservation._id);
    await user.save();
    console.log('User updated with new reservation:', user);

    res.status(201).json({ message: 'Reservation created successfully', reservationId: savedReservation._id.toString() });
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});


app.post('/api/update-name', async (req, res) => {
  const { email, newName } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, { $set: { name: newName } }, { new: true });
    if (user) {
      await Reservation.updateMany({ email }, { $set: { name: newName } });
      res.status(200).json({ message: 'Name updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating name:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/update-email', async (req, res) => {
  const { oldEmail, newEmail } = req.body;
  try {
    const user = await User.findOneAndUpdate({ email: oldEmail }, { $set: { email: newEmail } }, { new: true });
    if (user) {
      await Reservation.updateMany({ email: oldEmail }, { $set: { email: newEmail } });
      res.status(200).json({ message: 'Email updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating email:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/update-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne({ email }, { $set: { password: hashedPassword } });
    if (result.nModified > 0) {
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/cancel-reservation', async (req, res) => {
  const { reservationId, email } = req.body;
  console.log('Cancel reservation request received:', req.body);

  if (!email) {
    console.error('User email is missing');
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      const reservationObjectId = mongoose.Types.ObjectId.createFromHexString(reservationId);
      const reservation = await Reservation.findById(reservationObjectId);
      if (!reservation) {
        console.error('Reservation not found:', reservationId);
        return res.status(404).json({ error: 'Reservation not found' });
      }
      
      await Reservation.deleteOne({ _id: reservationObjectId });
      user.reservations.pull(reservationObjectId);
      await user.save();
      console.log('Reservation cancelled and user updated:', user);
      res.status(200).json({ message: 'Reservation cancelled successfully' });
    } else {
      console.error('User not found for email:', email);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error cancelling reservation:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.get('/api/user', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email }).populate('reservations');
    console.log(user); // Log the user object to verify reservations are populated
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
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
      res.json({ loggedIn: true, user: { email: user.email, name: user.name, role: user.role } }); 
    } catch (err) {
      console.error('Error authenticating user:', err);
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
    console.error('Error looking up reservation:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

// Admin route
app.get('/api/admin/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Force cancel reservation for admin
app.post('/api/cancel-res-force', async (req, res) => {
  const { reservationId } = req.body;
  console.log('Admin cancel reservation request received:', req.body);

  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      console.error('Reservation not found:', reservationId);
      return res.status(404).json({ error: 'Reservation not found' });
    }
    
    await Reservation.deleteOne({ _id: reservationId });
    const user = await User.findOne({ email: reservation.email });
    if (user) {
      user.reservations.pull(reservationId);
      await user.save();
      console.log('Reservation cancelled and user updated:', user);
    } else {
      console.log('User not found for reservation email:', reservation.email);
    }
    
    res.status(200).json({ message: 'Reservation cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling reservation:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

// Room endpoints
app.post('/api/rooms', async (req, res) => {
  const { name, description, price, imageUrl, link } = req.body;
  try {
    const newRoom = new Room({ name, description, price, imageUrl, link });
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully' });
  } catch (err) {
    console.error('Error creating room:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
