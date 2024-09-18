import Image from "next/image";

export function Banner() {
  return (
    <div className="flex justify-center p-4">
      <Image
        className="h-[50vh] w-full rounded-md bg-muted object-cover"
        src="https://plus.unsplash.com/premium_vector-1726267370684-2642bdeb7f10"
        alt="Banner"
        width={16 * 40}
        height={16 * 20}
        unoptimized
      />
    </div>
  );
}
