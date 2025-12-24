import habit from "../models/habit_model.js";


export const createHabit = async (req, res) => {
    try {
        const { title, frequency, color } = req.body;

      
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newHabit = new habit({
            user: req.user.id, 
            title,
            frequency,
            color,
            completedDates: [], 
            currentStreak: 0
        });

        
        const savedHabit = await newHabit.save();

        
        res.status(201).json(
            {
                savedHabit,
                 success:true
            }
        );

    } catch (error) {
        console.error("Error creating habit:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


export const getHabits = async (req, res) => {
    try {
        const userId = req.user.id; 

        if (!userId) {
            return res.status(401).json({ message: "User not identified" });
        }

        const habits = await habit.find({ user: userId });
        res.status(200).json(habits);
    } catch (error) {
        console.error("GET HABITS ERROR:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const deleteHabit = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id; 

    
        const habitToDelete = await habit.findOneAndDelete({ 
            _id: id, 
            user: userId 
        });

        if (!habitToDelete) {
            return res.status(404).json({ message: "Habit not found or unauthorized" });
        }

        res.status(200).json({ message: "Habit deleted successfully", id });
    } catch (error) {
        console.error("DELETE HABIT ERROR:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const toggleHabitStatus = async (req, res) => {
  try {
    const habitInstance = await habit.findById(req.params.id);
    
    const todayStr = new Date().toISOString().split('T')[0];

   
    const index = habitInstance.completedDates.findIndex(d => {
      try {
        return new Date(d).toISOString().split('T')[0] === todayStr;
      } catch (e) {
        return false;
      }
    });

    if (index === -1) {
      habitInstance.completedDates.push(todayStr);
      habitInstance.currentStreak += 1;
    } else {
      habitInstance.completedDates.splice(index, 1);
      habitInstance.currentStreak = Math.max(0, habitInstance.currentStreak - 1);
    }
    // console.log(habitInstance.completedDates)
    await habitInstance.save();
    res.status(200).json(habitInstance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};