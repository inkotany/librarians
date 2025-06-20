'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAcquisitions } from './actions';
import NitSkeleton from '@/app/_components/Skeleton';

const SkeletonRow = () => (
  <tr>
    {[...Array(4)].map((_, i) => (
      <td key={i} className="p-4">
        <NitSkeleton height="1rem" width="100%" />
      </td>
    ))}
  </tr>
);

const AcquisitionsTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['acquisitions'],
    queryFn: fetchAcquisitions,
  });

  return (
    <>
      <h2 className="library-subtitle mt-6 mb-4">Recent acquisitions</h2>
      <div className="overflow-x-auto border rounded-xl border-gray-400">
        <table className="w-full border-collapse text-sm rounded-lg border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left rounded-tl-lg border-b border-gray-300 dark:border-gray-700">Book Title</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Code</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Book Copies</th>
              <th className="p-4 text-left border-b border-gray-300 dark:border-gray-700">Supplier Name</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && [...Array(5)].map((_, index) => <SkeletonRow key={index} />)}

            {isError && (
              <tr>
                <td colSpan={4} className="p-4 text-red-500">
                  Failed to load acquisitions.
                </td>
              </tr>
            )}

            {data?.map((acquisition, index) => (
              <tr key={index} className="table-r hover:text-white hover:bg-primary transition-colors">
                <td className="table-data">{acquisition.bookTitle}</td>
                <td className="table-data">{acquisition.code}</td>
                <td className="table-data">{acquisition.quantity}</td>
                <td className="table-data">{acquisition.supplier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AcquisitionsTable;
