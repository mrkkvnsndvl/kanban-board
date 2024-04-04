import { Skeleton } from '@/components/ui/skeleton';

export default function TaskSkeleton() {
  return (
    <Skeleton className='w-full h-[155px] p-3 mb-3 bg-white rounded-md flex flex-col justify-between items-end'>
      <div className='w-full'>
        <div className='flex w-full items-center justify-between'>
          <Skeleton className='w-[100px] h-[20px] rounded-sm mr-1 sm:mr-2' />
          <Skeleton className='w-5 h-5 rounded-sm' />
        </div>
        <Skeleton className='w-full h-[15px] rounded-sm mt-2' />
      </div>
      <Skeleton className='w-5 h-5 rounded-sm' />
    </Skeleton>
  );
}
