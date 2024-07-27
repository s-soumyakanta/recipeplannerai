import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  value: String,
  label: String
});

const userPreferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  proteins: { type: [optionSchema], default: [] },
  vegetables: { type: [optionSchema], default: [] },
  fruits: { type: [optionSchema], default: [] },
  grains: { type: [optionSchema], default: [] },
  dairy: { type: [optionSchema], default: [] },
  herbs: { type: [optionSchema], default: [] },
  spices: { type: [optionSchema], default: [] },
  condiments: { type: [optionSchema], default: [] },
  oils: { type: [optionSchema], default: [] },
  customIngredients: { type: String, default: '' },
  
  dietaryRestrictions: { type: [optionSchema], default: [] },
  allergies: { type: [optionSchema], default: [] },
  preferredCuisines: { type: [optionSchema], default: [] },
  flavorPreferences: { type: [optionSchema], default: [] },
  mealTypes: { type: [optionSchema], default: [] },
  cookingMethods: { type: [optionSchema], default: [] },
  averageCookingTime: { type: Number, min: 5, max: 120, default: 30 },
  cookingSkillLevel: optionSchema,
  dietGoals: { type: [optionSchema], default: [] },
  calorieTarget: { type: Number, min: 500, max: 5000, default: 2000 },
  mealPlanFrequency: optionSchema,
  specialInstructions: { type: String, maxLength: 500, default: '' }
});

const UserPreferences = mongoose.models.UserPreferences || mongoose.model('UserPreferences', userPreferencesSchema);

export default UserPreferences;
