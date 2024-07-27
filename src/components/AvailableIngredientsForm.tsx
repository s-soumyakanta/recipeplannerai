"use client";

import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      const userId = "60d0fe4f5311236168a109de"; // Replace with actual userId
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
    const dataWithUserId = { ...data, userId };

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

  const customStyles: StylesConfig<Option, true> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '36px',
      height: 'auto',
      background: state.isFocused ? 'var(--bg-control-focused, #f0f0f0)' : 'var(--bg-control, #ffffff)',
      borderColor: state.isFocused ? 'var(--border-control-focused, #2684FF)' : 'var(--border-control, #cccccc)',
      boxShadow: state.isFocused ? '0 0 0 1px var(--border-control-focused, #2684FF)' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? 'var(--border-control-focused, #2684FF)' : 'var(--border-control-hover, #999999)',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '2px 8px',
      flexWrap: 'wrap',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--bg-multi-value, #e6f0ff)',
      borderRadius: '4px',
      margin: '2px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--text-multi-value, #0052cc)',
      padding: '2px 6px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'var(--text-multi-value-remove, #0052cc)',
      ':hover': {
        backgroundColor: 'var(--bg-multi-value-remove-hover, #cce0ff)',
        color: 'var(--text-multi-value-remove-hover, #003d99)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const renderSelect = (name: keyof FormData, options: Option[], placeholder: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <div className="relative">
          <Select
            ref={ref}
            options={options}
            isMulti
            value={Array.isArray(value) ? options.filter(option => value.some(item => item.value === option.value)) : []}
            onChange={(selectedOptions) => onChange(selectedOptions as Option[])}
            styles={customStyles}
            placeholder={placeholder}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      )}
    />
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">Available Ingredients</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'proteins', options: createOptions(['Chicken', 'Fish', 'Tofu', 'Eggs', 'Beans', 'Paneer', 'Lamb']), label: 'Proteins' },
              { name: 'vegetables', options: createOptions(['Tomatoes', 'Onions', 'Carrots', 'Broccoli', 'Spinach', 'Bell Peppers', 'Potatoes', 'Kale', 'Peas', 'Cauliflower', 'Zucchini', 'Eggplant']), label: 'Vegetables' },
              { name: 'fruits', options: createOptions(['Apples', 'Bananas', 'Oranges', 'Berries', 'Lemons', 'Limes', 'Mangoes', 'Pineapple', 'Grapes', 'Peaches']), label: 'Fruits' },
              { name: 'grains', options: createOptions(['Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Barley', 'Couscous', 'Millet']), label: 'Grains' },
              { name: 'dairy', options: createOptions(['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Buttermilk', 'Ghee']), label: 'Dairy' },
              { name: 'herbs', options: createOptions(['Basil', 'Parsley', 'Cilantro', 'Thyme', 'Rosemary', 'Mint', 'Dill', 'Sage']), label: 'Herbs' },
              { name: 'spices', options: createOptions(['Salt', 'Pepper', 'Cumin', 'Paprika', 'Cinnamon', 'Garlic Powder', 'Turmeric', 'Cardamom', 'Cloves', 'Nutmeg', 'Coriander']), label: 'Spices' },
              { name: 'condiments', options: createOptions(['Ketchup', 'Mustard', 'Mayonnaise', 'Soy Sauce', 'Hot Sauce', 'Sriracha', 'Chutney', 'Relish']), label: 'Condiments' },
              { name: 'oils', options: createOptions(['Olive Oil', 'Vegetable Oil', 'Coconut Oil', 'Sesame Oil', 'Avocado Oil', 'Ghee']), label: 'Oils' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">{field.label}</label>
                {renderSelect(field.name as keyof FormData, field.options, `Select ${field.label.toLowerCase()}...`)}
                {errors[field.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">This field is required</p>}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Custom Ingredients</label>
            <textarea
              {...register('customIngredients')}
              placeholder="Enter any additional ingredients you have, separated by commas"
              className="w-full dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 h-24 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <div className='w-full flex justify-end'>
            <button 
              type="submit" 
              className="md:w-1/5 w-2/4 text-white dark:text-gray-100 bg-indigo-500 border-0 text-center py-2 md:px-8 focus:outline-none hover:bg-indigo-600 rounded text-sm md:text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Ingredients'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AvailableIngredientsForm;