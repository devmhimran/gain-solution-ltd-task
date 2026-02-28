'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { StudentFormValues } from '@/types';
import { Button, FieldError, Input } from '../shared';
import { X } from 'lucide-react';

const studentSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  year: z
    .number()
    .int('Year must be an integer')
    .min(1900, 'Year must be 1900 or later')
    .max(
      new Date().getFullYear() + 10,
      'Year cannot be more than 10 years in the future',
    ),
  grades: z.array(
    z.object({
      courseId: z.string().min(1, 'Course ID is required'),
      grade: z
        .string()
        .min(1, 'Grade is required')
        .regex(
          /^[A-F][+-]?$/i,
          'Grade must be A-F with optional + or - (e.g., A, B+, C-)',
        ),
      term: z.string().min(1, 'Term is required'),
    }),
  ),
});

interface Props {
  defaultValues?: StudentFormValues;
  onSubmit: (data: StudentFormValues) => void;
  mode: 'create' | 'update';
}

export function StudentForm({ defaultValues, onSubmit, mode }: Props) {
  const { register, control, handleSubmit, formState } =
    useForm<StudentFormValues>({
      resolver: zodResolver(studentSchema),
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
      <div>
        <Input placeholder='Student Name' {...register('name')} />
        <FieldError errors={formState.errors} field='name' />
      </div>

      <div>
        <Input
          type='number'
          placeholder='Year'
          {...register('year', { valueAsNumber: true })}
        />
        <FieldError errors={formState.errors} field='year' />
      </div>

      <div className='flex flex-col gap-3'>
        <div className='text-sm text-slate-800'>Grades</div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className='flex justify-between items-start gap-2 bg-slate-100 border border-slate-200 p-4 rounded-md'
          >
            <div className='w-full space-y-2'>
              <div className='flex gap-2 '>
                <div className='w-full space-y-1'>
                  <Input
                    placeholder='Course ID'
                    {...register(`grades.${index}.courseId`)}
                  />
                  <FieldError
                    errors={formState.errors}
                    field={`grades.${index}.courseId`}
                  />
                </div>
                <div className='w-full space-y-1'>
                  <Input
                    placeholder='Grade (A, B+...)'
                    {...register(`grades.${index}.grade`)}
                  />
                  <FieldError
                    errors={formState.errors}
                    field={`grades.${index}.grade`}
                  />
                </div>
              </div>
              <div>
                <Input
                  placeholder='Term'
                  {...register(`grades.${index}.term`)}
                />
                <FieldError
                  errors={formState.errors}
                  field={`grades.${index}.term`}
                />
              </div>
            </div>
            <div
              onClick={() => remove(index)}
              className='text-red-500 hover:bg-slate-200 cursor-pointer p-1.5'
            >
              <X className='w-4 h-4' />
            </div>
          </div>
        ))}

        <div
          className='cursor-pointer text-blue-500 flex justify-center'
          onClick={() => append({ courseId: '', grade: '', term: '' })}
        >
          <Button
            type='button'
            variant='ghost'
            className='text-slate-600 font-semibold'
          >
            + Add Grade
          </Button>
        </div>
      </div>

      <div className='flex justify-end'>
        <Button type='submit' className='w-full'>
          {mode === 'create' ? 'Create Student' : 'Update Student'}
        </Button>
      </div>
    </form>
  );
}
