import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '@/store';
import { Button, FieldError, Input } from '../shared';
import { X } from 'lucide-react';

const courseSchema = z.object({
  name: z.string().min(1, 'Course name is required'),

  facultyIds: z
    .array(
      z.object({
        id: z.string().min(1, 'Select a faculty'),
      }),
    )
    .min(1, 'Select at least one faculty'),

  enrolledCount: z.number().min(0),

  metadata: z.array(
    z.object({
      key: z.string().min(1, 'Key is required'),
      value: z.string().min(1, 'Value is required'),
    }),
  ),
});

type CourseFormValues = z.infer<typeof courseSchema>;

type CourseData = {
  name: string;
  facultyIds: string[];
  enrolledCount: number;
  metadata: { key: string; value: string }[];
};

type CourseFormProps = {
  initialData?: CourseData;
  onSubmit: (data: CourseData) => void;
};

export function CourseForm({ initialData, onSubmit }: CourseFormProps) {
  const faculties = useStore((state) => state.faculties);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          facultyIds: initialData.facultyIds.map((id) => ({ id })),
        }
      : {
          name: '',
          facultyIds: [{ id: '' }],
          enrolledCount: 0,
          metadata: [],
        },
  });

  const facultyArray = useFieldArray({
    control: form.control,
    name: 'facultyIds',
  });

  const metadataArray = useFieldArray({
    control: form.control,
    name: 'metadata',
  });

  const removeFaculty = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (facultyArray.fields.length > 1) {
      facultyArray.remove(index);
    }
  };

  const removeMetadata = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    metadataArray.remove(index);
  };

  const handleSubmit = (data: CourseFormValues) => {
    const transformedData: CourseData = {
      ...data,
      facultyIds: data.facultyIds.map((f) => f.id),
    };
    onSubmit(transformedData);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
      <div>
        <Input label='Course Name' {...form.register('name')} />
        <FieldError errors={form.formState.errors} field='name' />
      </div>

      <div>
        <Input
          label='Enrolled Count'
          type='number'
          {...form.register('enrolledCount', { valueAsNumber: true })}
        />
        <FieldError errors={form.formState.errors} field='enrolledCount' />
      </div>

      <div className='space-y-2 p-3 border border-gray-300 rounded-md bg-slate-50'>
        <div className='text-sm'>Assigned Faculty</div>
        {facultyArray.fields.map((field, index) => (
          <div key={field.id}>
            <div className='flex items-center gap-3'>
              <Controller
                control={form.control}
                name={`facultyIds.${index}.id`}
                render={({ field }) => (
                  <select
                    {...field}
                    className='w-full border border-gray-300 rounded-md bg-white px-3 py-2.5 text-sm'
                  >
                    <option value=''>Select faculty</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                )}
              />

              <button
                type='button'
                onClick={(e) => removeFaculty(index, e)}
                className='p-2 hover:bg-gray-100 rounded transition-colors'
                disabled={facultyArray.fields.length === 1}
              >
                <X className='w-4 h-4 text-red-500' />
              </button>
            </div>
            <p className='text-red-600 text-sm'>
              {form.formState.errors.facultyIds?.[index]?.id?.message}
            </p>
          </div>
        ))}

        <button
          type='button'
          onClick={() => facultyArray.append({ id: '' })}
          className='text-sm text-slate-700 font-semibold cursor-pointer'
        >
          + Add Faculty
        </button>
      </div>

      <p className='text-red-600 text-sm'>
        {form.formState.errors.facultyIds?.root?.message}
      </p>

      <div className='space-y-2 p-3 border border-gray-300 rounded-md bg-slate-50'>
        <div className='text-sm'>Metadata</div>
        {metadataArray.fields.map((field, index) => (
          <div key={field.id} className='flex gap-2'>
            <div>
              <Input
                placeholder='Key (e.g. room)'
                {...form.register(`metadata.${index}.key`)}
              />

              <p className='text-red-600 text-sm'>
                {form.formState.errors.metadata?.[index]?.key?.message}
              </p>
            </div>

            <div>
              <Input
                placeholder='Value (e.g. 302)'
                {...form.register(`metadata.${index}.value`)}
              />
              <p className='text-red-600 text-sm'>
                {form.formState.errors.metadata?.[index]?.value?.message}
              </p>
            </div>

            <button
              type='button'
              onClick={(e) => removeMetadata(index, e)}
              className='p-2 hover:bg-gray-100 rounded transition-colors mt-2.5'
            >
              <X className='w-4 h-4 text-red-500' />
            </button>
          </div>
        ))}

        <button
          type='button'
          className='text-sm'
          onClick={() => metadataArray.append({ key: '', value: '' })}
        >
          + Add Metadata
        </button>
      </div>

      <div className='flex justify-end'>
        <Button type='submit'>Save Course</Button>
      </div>
    </form>
  );
}
