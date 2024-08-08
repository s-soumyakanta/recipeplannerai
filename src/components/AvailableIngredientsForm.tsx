"use client";

import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import Loading from './Loading';
import SaveButton from './SaveButton';

const formSchema = z.object({
  proteins: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  vegetables: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  fruits: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  grains: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  dairy: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  herbs: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  spices: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  condiments: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  oils: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  customIngredients: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

interface Option {
  value: string;
  label: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const AvailableIngredientsForm: React.FC = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const { data, isValidating } = useSWR(
    session?.user?.id ? `/api/getpreferences?userId=${session.user.id}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        reset(data);
      },
      onError: (error) => {
        setError('Error fetching preferences');
        toast.error("Failed to fetch preferences.", { position: "top-right" });
      }
    }
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    if (!session?.user?.id) {
      setError('User not authenticated');
      toast.error("User not authenticated.", { position: "top-right" });
      setIsSubmitting(false);
      return;
    }

    const dataWithUserId = { ...data, userId: session.user.id };

    try {
      const response = await fetch('/api/savepreferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataWithUserId),
      });

      if (response.ok) {
        toast.success("Preferences saved successfully!", { position: "top-right" });
      } else {
        setError('Error saving preferences');
        toast.error("Error saving preferences.", { position: "top-right" });
      }
    } catch (error) {
      setError('Error saving preferences');
      toast.error("Error saving preferences.", { position: "top-right" });
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
    <div className="container mx-auto bg-white dark:bg-gray-950">
      <h1 className="text-2xl font-medium mb-6 text-gray-900 dark:text-white">Available Ingredients</h1>
      {isValidating ? (
        <Loading />
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
                {errors[field.name as keyof FormData] && <p className="text-red-500 text-xs mt-1">{errors[field.name as keyof FormData]?.message}</p>}
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
            <SaveButton isLoading={isSubmitting}>
              Save Ingredients
            </SaveButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default AvailableIngredientsForm;
