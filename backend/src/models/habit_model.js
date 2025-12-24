import mongoose from "mongoose";

const HabitSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a habit name'],
    trim: true
  },


  color: {
    type: String,
    default: '#16697a' 
  },

  frequency: {
    type: String,
    enum: ['daily', 'weekly'],
    default: 'daily',
    lowercase: true, 
  },
  
  completedDates: [
{
    type: String, 
    default: []
  }
  ],

  currentStreak: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const habit =mongoose.model('Habit', HabitSchema);

export default habit