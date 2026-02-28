import {
  FieldErrors,
  FieldPath,
  FieldValues,
  FieldError as RHFFieldError,
} from 'react-hook-form';

interface FieldErrorProps<TFieldValues extends FieldValues> {
  errors: FieldErrors<TFieldValues>;
  field: FieldPath<TFieldValues>;
}

function getNestedError(
  obj: FieldErrors<FieldValues>,
  path: string,
): RHFFieldError | undefined {
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = obj;

  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    current = current[key];
  }

  return current as RHFFieldError | undefined;
}

export function FieldError<TFieldValues extends FieldValues>({
  errors,
  field,
}: FieldErrorProps<TFieldValues>) {
  const error = getNestedError(errors, field as string);
  if (!error) return null;

  return (
    <div className='text-orange-600 text-sm'>{error.message as string}</div>
  );
}
