'use client';

import { useDebounce } from '@/hooks';
import { useGetStudents } from '@/hooks/use-students';
import { generateQueryString } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  const debounce = useDebounce(searchQuery, 500);

  const params = useMemo(
    () => ({
      search: debounce,
      course: searchParams.get('course') || '',
      year: searchParams.get('year') || '',
      page: '1',
    }),
    [debounce, searchParams],
  );

  const queryString = generateQueryString(params);

  const { data, isLoading, isError } = useGetStudents(queryString);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  // if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      StudentsPage
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search students...'
        className='border p-2 rounded'
      />
      <div className=''>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
