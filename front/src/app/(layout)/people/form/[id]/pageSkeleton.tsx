import { Skeleton } from '@/components/ui/skeleton'

export default function PageSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex gap-5  justify-end w-full mr-10 mt-10">
        <Skeleton className="w-20 h-10" />
        <Skeleton className="w-20 h-10" />
      </div>
      <div className="flex justify-center items-center gap-10 mt-10">
        <div>
          <Skeleton className="w-44 h-44 rounded-full" />
          <Skeleton className="w-44 h-6 mt-5" />
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton className="w-52 h-6  rounded-lg" />
          <div className=" border-gray-300 border-2 w-[700px] p-5">
            <Skeleton className="w-52 h-12 mb-5 rounded-lg" />
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-6 rounded-md" />
                <Skeleton className="w-52 h-6 rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-6 rounded-md" />
                <Skeleton className="w-52 h-6 rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-6 rounded-md" />
                <Skeleton className="w-52 h-6 rounded-md" />
              </div>
            </div>
          </div>
          <div className=" border-gray-300 border-2 w-[700px] p-5">
            <Skeleton className="w-52 h-12 mb-5 rounded-lg" />
            <div className="flex gap-5">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-6 rounded-md" />
                <Skeleton className="w-52 h-6 rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-6 rounded-md" />
                <Skeleton className="w-52 h-6 rounded-md" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-20 h-6 rounded-md" />
                <Skeleton className="w-52 h-6 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 p-5 w-[80%] gap-5 flex flex-col items-center">
        <div className="w-full">
          <Skeleton className="w-52 h-12 mb-5 rounded-lg" />
        </div>
        <div className="flex flex-col   items-start gap-5 w-full">
          <div className="flex gap-5 w-full justify-between">
            <div className="flex flex-col gap-2 ">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
          </div>
          <div className="flex gap-5 w-full justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
          </div>
          <div className="flex gap-5 w-full justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-52 h-6 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
