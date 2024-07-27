"use client";

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  dietaryRestrictions: z.array(z.object({ value: z.string(), label: z.string() })),
  allergies: z.array(z.object({ value: z.string(), label: z.string() })),
  preferredCuisines: z.array(z.object({ value: z.string(), label: z.string() })),
  flavorPreferences: z.array(z.object({ value: z.string(), label: z.string() })),
  mealTypes: z.array(z.object({ value: z.string(), label: z.string() })),
  cookingMethods: z.array(z.object({ value: z.string(), label: z.string() })),
  averageCookingTime: z.number().min(5).max(120),
  cookingSkillLevel: z.object({ value: z.string(), label: z.string() }),
  dietGoals: z.array(z.object({ value: z.string(), label: z.string() })),
  calorieTarget: z.number().min(500).max(5000),
  mealPlanFrequency: z.object({ value: z.string(), label: z.string() }),
  specialInstructions: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
}

const DietPreferenceForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      averageCookingTime: 30,
      calorieTarget: 2000,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const createOptions = (items: string[]): Option[] => items.map(item => ({ value: item.toLowerCase(), label: item }));

  const selectStyles: StylesConfig = {
    control: (base, state) => ({
      ...base,
      background: state.isFocused ? 'var(--bg-control-focused)' : 'var(--bg-control)',
      borderColor: state.isFocused ? 'var(--border-control-focused)' : 'var(--border-control)',
      minHeight: '36px',
      height: '36px',
      boxShadow: state.isFocused ? '0 0 0 1px var(--border-control-focused)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--border-control-focused)' : 'var(--border-control-hover)',
      },
    }),
    menu: (base) => ({
      ...base,
      background: 'var(--bg-menu)',
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? 'var(--bg-option-focused)' : 'var(--bg-option)',
      color: 'var(--text-option)',
      '&:active': {
        background: 'var(--bg-option-active)',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--text-single-value)',
    }),
    multiValue: (base) => ({
      ...base,
      background: 'var(--bg-multi-value)',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'var(--text-multi-value)',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'var(--text-multi-value-remove)',
      ':hover': {
        background: 'var(--bg-multi-value-remove-hover)',
        color: 'var(--text-multi-value-remove-hover)',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0 6px',
    }),
    input: (base) => ({
      ...base,
      margin: '0px',
      color: 'var(--text-input)',
    }),
  };

  const renderSelect = (name: keyof FormData, options: Option[], placeholder: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} options={options} isMulti styles={selectStyles} placeholder={placeholder} className="mb-1" />
      )}
    />
  );

  const renderSingleSelect = (name: keyof FormData, options: Option[], placeholder: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} options={options} styles={selectStyles} placeholder={placeholder} className="mb-1" />
      )}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">Diet Preferences</h1>
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
            className="w-full  dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-24 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
          {errors.specialInstructions && <p className="text-red-500 text-xs mt-1">Special instructions too long</p>}
        </div>
        <div className='w-full flex justify-end'>
          <button 
            type="submit" 
            className="md:w-1/5 w-2/4 text-white dark:text-gray-100 bg-indigo-500 border-0 text-center py-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm md:text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DietPreferenceForm;
