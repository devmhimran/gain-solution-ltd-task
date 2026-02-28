import { FieldErrors, FieldPath, FieldValues } from 'react-hook-form';

interface FieldErrorProps<TFieldValues extends FieldValues> {
  errors: FieldErrors<TFieldValues>;
  field: FieldPath<TFieldValues>;
}

export function FieldError<TFieldValues extends FieldValues>({
  errors,
  field,
}: FieldErrorProps<TFieldValues>) {
  const error = errors[field as keyof FieldErrors<TFieldValues>];
  if (!error) return null;

  return (
    <div className='text-orange-600 text-sm'>{error.message as string}</div>
  );
}
