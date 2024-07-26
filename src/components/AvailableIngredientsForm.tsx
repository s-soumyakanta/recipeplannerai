"use client";

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  proteins: z.array(z.object({ value: z.string(), label: z.string() })),
  vegetables: z.array(z.object({ value: z.string(), label: z.string() })),
  fruits: z.array(z.object({ value: z.string(), label: z.string() })),
  grains: z.array(z.object({ value: z.string(), label: z.string() })),
  dairy: z.array(z.object({ value: z.string(), label: z.string() })),
  herbs: z.array(z.object({ value: z.string(), label: z.string() })),
  spices: z.array(z.object({ value: z.string(), label: z.string() })),
  condiments: z.array(z.object({ value: z.string(), label: z.string() })),
  oils: z.array(z.object({ value: z.string(), label: z.string() })),
  customIngredients: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
}

const AvailableIngredientsForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  const createOptions = (items: string[]): Option[] => items.map(item => ({ value: item.toLowerCase(), label: item }));

  const selectStyles: StylesConfig = {
    control: (base) => ({ ...base, background: '#1f2937', borderColor: '#374151', minHeight: '36px', height: '36px' }),
    menu: (base) => ({ ...base, background: '#1f2937' }),
    option: (base, state) => ({ ...base, background: state.isFocused ? '#374151' : '#1f2937', color: '#d1d5db' }),
    singleValue: (base) => ({ ...base, color: '#d1d5db' }),
    multiValue: (base) => ({ ...base, background: '#374151' }),
    multiValueLabel: (base) => ({ ...base, color: '#d1d5db' }),
    multiValueRemove: (base) => ({ ...base, color: '#d1d5db', ':hover': { background: '#4b5563', color: '#fff' } }),
    valueContainer: (base) => ({ ...base, padding: '0 6px' }),
    input: (base) => ({ ...base, margin: '0px' }),
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-medium mb-6 text-white">Available Ingredients</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'proteins', options: createOptions(['Chicken', 'Fish', 'Tofu', 'Eggs', 'Beans']), label: 'Proteins' },
            { name: 'vegetables', options: createOptions(['Tomatoes', 'Onions', 'Carrots', 'Broccoli', 'Spinach', 'Bell Peppers', 'Potatoes']), label: 'Vegetables' },
            { name: 'fruits', options: createOptions(['Apples', 'Bananas', 'Oranges', 'Berries', 'Lemons', 'Limes']), label: 'Fruits' },
            { name: 'grains', options: createOptions(['Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats']), label: 'Grains' },
            { name: 'dairy', options: createOptions(['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream']), label: 'Dairy' },
            { name: 'herbs', options: createOptions(['Basil', 'Parsley', 'Cilantro', 'Thyme', 'Rosemary']), label: 'Herbs' },
            { name: 'spices', options: createOptions(['Salt', 'Pepper', 'Cumin', 'Paprika', 'Cinnamon', 'Garlic Powder']), label: 'Spices' },
            { name: 'condiments', options: createOptions(['Ketchup', 'Mustard', 'Mayonnaise', 'Soy Sauce', 'Hot Sauce']), label: 'Condiments' },
            { name: 'oils', options: createOptions(['Olive Oil', 'Vegetable Oil', 'Coconut Oil', 'Sesame Oil']), label: 'Oils' },
          ].map((field) => (
            <div key={field.name} className="mb-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">{field.label}</label>
              {renderSelect(field.name as keyof FormData, field.options, `Select ${field.label.toLowerCase()}...`)}
              {errors[field.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">This field is required</p>}
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Custom Ingredients</label>
          <textarea
            {...register('customIngredients')}
            placeholder="Enter any additional ingredients you have, separated by commas"
            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-24 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
        <div className='w-full flex justify-end'>
          <button 
            type="submit" 
            className="md:w-1/5 w-2/4   text-white text-base bg-indigo-500 border-0 py-2 text-center md:py-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded md:text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Ingredients'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvailableIngredientsForm;