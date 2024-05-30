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

// Export app for testing
export { app, server };

// Connect to the database and start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  connectToDatabase().then(() => {
    server.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  }).catch(error => {
    console.error('Failed to start the server:', error);
  });
}

