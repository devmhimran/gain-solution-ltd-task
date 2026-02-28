export function CourseTableSkeleton() {
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 shadow-sm'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Course ID
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Course Name
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Faculty Members
            </th>
            <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Enrollment
            </th>
            <th className='px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Options
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className='animate-pulse'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded w-16'></div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded w-32'></div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded w-12'></div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded w-12'></div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='h-4 bg-gray-200 rounded w-15 mx-auto'></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
