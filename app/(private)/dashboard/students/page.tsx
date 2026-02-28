'use client';

import {
  StudentDataTable,
  StudentPageHeader,
} from '@/components/pages/students';
import { StudentTableSkeleton } from '@/components/skeletons';
import { useGetStudents } from '@/hooks/use-students';
import { generateQueryString } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [params, setParams] = useState({
    search: searchParams.get('search') || '',
    page: searchParams.get('page') || '1',
    year: searchParams.get('year') || '',
  });

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || '',
  );

  const debounced = useDebouncedCallback((value) => {
    setParams((prevParams) => ({
      ...prevParams,
      search: value,
      page: '1',
    }));
  }, 500);

  const queryString = generateQueryString(params);
  const { data, isLoading } = useGetStudents(queryString);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  return (
    <div className='space-y-10 w-full xl:w-8/12 mx-auto'>
      <StudentPageHeader
        searchQuery={searchQuery}
        searchQueryChange={(e) => {
          setSearchQuery(e.target.value);
          debounced(e.target.value);
        }}
        setParams={(e) =>
          setParams((prev) => ({
            ...prev,
            year: e.target.value,
            page: '1',
          }))
        }
      />

      {!isLoading ? <StudentDataTable data={data} /> : <StudentTableSkeleton />}
    </div>
  );
}
