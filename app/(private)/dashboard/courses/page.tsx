'use client';

import { CourseDataTable, CoursePageHeader } from '@/components/pages/course';
import { useGetCourses } from '@/hooks';
import { generateQueryString } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [params, setParams] = useState({
    search: searchParams.get('search') || '',
    page: searchParams.get('page') || '1',
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
  const { data, isLoading } = useGetCourses(queryString);

  useEffect(() => {
    router.push(queryString);
  }, [queryString, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='space-y-10 w-full md:w-4/6 mx-auto'>
      <CoursePageHeader
        searchQuery={searchQuery}
        searchQueryChange={(e) => {
          setSearchQuery(e.target.value);
          debounced(e.target.value);
        }}
      />
      <CourseDataTable data={data} />
    </div>
  );
}
