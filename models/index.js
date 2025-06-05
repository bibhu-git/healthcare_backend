import sequelize from '../config/database.js';

import UserModel from './user.js';
import PatientModel from './patient.js';
import DoctorModel from './doctor.js';
import MappingModel from './mapping.js';

const User = UserModel(sequelize);
const Patient = PatientModel(sequelize);
const Doctor = DoctorModel(sequelize);
const Mapping = MappingModel(sequelize);

// Define associations
User.hasMany(Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
Patient.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Doctor, { foreignKey: 'userId', onDelete: 'CASCADE' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

// Many-to-many through Mapping
Patient.belongsToMany(Doctor, { through: Mapping, foreignKey: 'patientId' });
Doctor.belongsToMany(Patient, { through: Mapping, foreignKey: 'doctorId' });

// One-to-many relationship for Mapping
Mapping.belongsTo(Patient, { foreignKey: 'patientId' });
Mapping.belongsTo(Doctor, { foreignKey: 'doctorId' });

export { sequelize, User, Patient, Doctor, Mapping };
