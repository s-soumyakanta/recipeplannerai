"use client";

import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  dietaryRestrictions: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  allergies: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  preferredCuisines: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  flavorPreferences: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  mealTypes: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  cookingMethods: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  averageCookingTime: z.number().min(5).max(120).optional(),
  cookingSkillLevel: z.object({ value: z.string(), label: z.string() }).optional(),
  dietGoals: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  calorieTarget: z.number().min(500).max(5000).optional(),
  mealPlanFrequency: z.object({ value: z.string(), label: z.string() }).optional(),
  specialInstructions: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
}

const DietPreferenceForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      averageCookingTime: 30,
      calorieTarget: 2000,
    },
  });

  const watchedFields = useWatch({ control });

  useEffect(() => {
    const fetchPreferences = async () => {
      const userId = "60d0fe4f5311236168a109de"; // Replace with actual userId
      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        setError('Invalid user ID');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/getpreferences?userId=${userId}`);
        const data = await response.json();
        if (response.ok) {
          reset(data);
        } else {
          setError(data.error || 'Failed to fetch preferences');
        }
      } catch (error) {
        setError('Error fetching preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [reset]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    const userId = "60d0fe4f5311236168a109de"; // Replace with actual userId
    const dataWithUserId = { ...data, userId }; // Add userId to the form data

    try {
      const response = await fetch('/api/savepreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithUserId),
      });

      if (response.ok) {
        console.log('Preferences saved successfully');
      } else {
        setError('Error saving preferences');
      }
    } catch (error) {
      setError('Error saving preferences');
    } finally {
      setIsSubmitting(false);
    }
  };

  const createOptions = (items: string[]): Option[] => items.map(item => ({ value: item.toLowerCase(), label: item }));

  const renderSelect = (name: keyof FormData, options: Option[], placeholder: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select 
          {...field} 
          options={options} 
          isMulti 
          placeholder={placeholder} 
          className="react-select-container mb-1"
          classNamePrefix="react-select"
        />
      )}
    />
  );

  const renderSingleSelect = (name: keyof FormData, options: Option[], placeholder: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select 
          {...field} 
          options={options} 
          placeholder={placeholder} 
          className="react-select-container mb-1"
          classNamePrefix="react-select"
        />
      )}
    />
  );

  const isFormEmpty = () => {
    return Object.values(watchedFields).every(field => {
      if (Array.isArray(field)) {
        return field.length === 0;
      } else if (typeof field === 'object' && field !== null) {
        return Object.keys(field).length === 0;
      } else {
        return !field;
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">Diet Preferences</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'dietaryRestrictions', options: createOptions(['Vegetarian', 'Vegan', 'Gluten-Free', 'Lactose-Free', 'Keto', 'Paleo']), label: 'Dietary Restrictions' },
              { name: 'allergies', options: createOptions(['Nuts', 'Dairy', 'Eggs', 'Soy', 'Wheat', 'Fish', 'Shellfish']), label: 'Allergies' },
              { name: 'preferredCuisines', options: createOptions(['Indian', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'American', 'French', 'Thai', 'Mediterranean', 'Other']), label: 'Preferred Cuisines' },
              { name: 'flavorPreferences', options: createOptions(['Sweet', 'Spicy', 'Salty', 'Sour', 'Bitter', 'Umami']), label: 'Flavor Preferences' },
              { name: 'mealTypes', options: createOptions(['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert']), label: 'Meal Types' },
              { name: 'cookingMethods', options: createOptions(['Baking', 'Grilling', 'Frying', 'Steaming', 'Roasting', 'Slow Cooking']), label: 'Cooking Methods' },
              { name: 'dietGoals', options: createOptions(['Weight Loss', 'Muscle Gain', 'Maintenance', 'Heart Health', 'Diabetes Management']), label: 'Diet Goals' },
            ].map((field) => (
              <div key={field.name} className="mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">{field.label}</label>
                {renderSelect(field.name as keyof FormData, field.options, `Select ${field.label.toLowerCase()}...`)}
                {errors[field.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">This field is required</p>}
              </div>
            ))}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Average Cooking Time (minutes)</label>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                {...register('averageCookingTime', { valueAsNumber: true })}
                className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <Controller
                name="averageCookingTime"
                control={control}
                render={({ field }) => (
                  <span className="text-sm text-gray-700 dark:text-gray-400 mt-1 block">{field.value} min</span>
                )}
              />
              {errors.averageCookingTime && <p className="text-red-500 text-xs mt-1">Invalid cooking time</p>}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Cooking Skill Level</label>
              {renderSingleSelect('cookingSkillLevel', createOptions(['Beginner', 'Intermediate', 'Advanced']), 'Select skill level...')}
              {errors.cookingSkillLevel && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Daily Calorie Target</label>
              <input
                type="number"
                {...register('calorieTarget', { valueAsNumber: true })}
                className="w-full dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.calorieTarget && <p className="text-red-500 text-xs mt-1">Invalid calorie target</p>}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Meal Plan Frequency</label>
              {renderSingleSelect('mealPlanFrequency', createOptions(['Daily', 'Weekly', 'Monthly']), 'Select frequency...')}
              {errors.mealPlanFrequency && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Special Instructions</label>
            <textarea
              {...register('specialInstructions')}
              placeholder="Enter any additional instructions you have, separated by commas (e.g., no sugar, extra sauce)"
              className="w-full dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-24 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
            {errors.specialInstructions && <p className="text-red-500 text-xs mt-1">Special instructions too long</p>}
          </div>
          <div className='w-full flex justify-end'>
            <button 
              type="submit" 
              className="md:w-1/5 w-2/4 text-white dark:text-gray-100 bg-indigo-500 border-0 text-center py-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm md:text-lg"
              disabled={isSubmitting || isFormEmpty()}
            >
              {isSubmitting ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DietPreferenceForm;
