"use client";

import { Skeleton } from "#/components/ui/skeleton";
import { useTypeOffices } from "#/features/office/hooks/use-login";


export default function ChooseProfileForm() {
  const { data } = useTypeOffices();
  console.log("data", data);
  return (
    <div className="grid grid-cols-3 gap-8">

      {
        Array.from({ length: 3 }, (_, i: number) => (
          <Skeleton
            key={i}
            className="h-[116px] w-[136px]  md:h-[130px] md:w-[150px]"
          />
          ))
      }
      {/* {isLoading
        ? Array.from({ length: 3 }, (_, i: number) => (
            <Skeleton
              key={i}
              className="h-[116px] w-[136px] md:h-[130px] md:w-[150px]"
            />
          ))
        : data?.map(({ id, title, label }) => (
            <Link
              key={id}
              href={`/auth/choose-profile/${id}`}
              className="flex  cursor-pointer flex-col items-center space-y-4 rounded-2xl border border-superBackground bg-white p-4 shadow hover:border-primary"
            >
              <Image
                src={`/images/${title}.svg`}
                alt="General dentist"
                height={50}
                width={50}
                className="h-[36px] w-[36px] md:h-[50px] md:w-[50px]"
              />
              <h3 className="text-sm font-semibold text-primary ">{label}</h3>
            </Link>
          ))} */
          }
    </div>
  );
}
