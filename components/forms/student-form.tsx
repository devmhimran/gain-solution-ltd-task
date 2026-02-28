'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { StudentFormValues } from '@/types';
import { Input } from '../shared';

interface Props {
  defaultValues?: StudentFormValues;
  onSubmit: (data: StudentFormValues) => void;
  mode: 'create' | 'update';
}

export function StudentForm({ defaultValues, onSubmit, mode }: Props) {
  const { register, control, handleSubmit } = useForm<StudentFormValues>({
    defaultValues: defaultValues ?? {
      name: '',
      year: new Date().getFullYear(),
      grades: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'grades',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Input
        placeholder='Student Name'
        {...register('name', { required: true })}
      />

      <Input
        type='number'
        placeholder='Year'
        {...register('year', { required: true })}
      />

      <div>
        <h3>Grades</h3>

        {fields.map((field, index) => (
          <div key={field.id}>
            <Input
              placeholder='Course ID'
              {...register(`grades.${index}.courseId`, {
                required: true,
              })}
            />
            <Input
              placeholder='Grade (A, B+...)'
              {...register(`grades.${index}.grade`, {
                required: true,
              })}
            />
            <Input
              placeholder='Term'
              {...register(`grades.${index}.term`, {
                required: true,
              })}
            />
            <button type='button' onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        <button
          type='button'
          onClick={() => append({ courseId: '', grade: '', term: '' })}
        >
          + Add Grade
        </button>
      </div>

      <button type='submit'>
        {mode === 'create' ? 'Create Student' : 'Update Student'}
      </button>
    </form>
  );
}
