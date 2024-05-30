import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { sequelize, connectToDatabase } from './config/database.js';

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import bidRoutes from './routes/bidRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Routes
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// WebSocket events
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('bid', (bid) => {
    io.emit('update', bid);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Error handling middleware
app.use(errorHandler);

// Connect to the database and start the server
connectToDatabase().then(() => {
  server.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => {
  console.error('Failed to start the server:', error);
});



/*
// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { pool } from './config/database.js'; // Assuming your database config is in 'config' folder

import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import bidRoutes from './routes/bidRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

// Initialize Express app
const app = express();

// Create HTTP serve
const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = new Server(server);

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use('/users', authRoutes);
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle bid event
  socket.on('bid', (bid) => {
    io.emit('update', bid);  // Broadcast the bid to all connected clients
  });

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Function to test the database connection and start the server
async function startServer() {
  try {
    // Test the database connection
    const connection = await  pool .getConnection();
    console.log('Connected successfully to the database.');
    connection.release();

    // Start the server
    server.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Start the server
startServer();
*/
