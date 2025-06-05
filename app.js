import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './models/index.js';

import authRoutes from './routes/auth.js';
import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';
import mappingRoutes from './routes/mappings.js';

import authenticate from './middleware/authenticate.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', authenticate, patientRoutes);
app.use('/api/doctors', authenticate, doctorRoutes);
app.use('/api/mappings', authenticate, mappingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
