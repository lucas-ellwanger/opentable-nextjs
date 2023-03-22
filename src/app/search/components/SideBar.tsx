import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';

export default function SideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: '$',
      className: 'border w-full text-reg font-light rounded-l p-2',
    },
    {
      price: PRICE.REGULAR,
      label: '$$',
      className: 'border-t border-b w-full text-reg font-light p-2',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$',
      className: 'border w-full text-reg font-light rounded-r p-2',
    },
  ];

  return (
    <div className='w-1/5'>
      <div className='flex flex-col border-b pb-4'>
        <h1 className='mb-2'>Region</h1>
        {locations.map((location) => (
          <Link
            key={location.id}
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            className='font-light text-reg capitalize'
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className='flex flex-col border-b pb-4 mt-3'>
        <h1 className='mb-2'>Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            key={cuisine.id}
            href={{
              pathname: '/search',
              query: { ...searchParams, cuisine: cuisine.name },
            }}
            className='font-light text-reg capitalize'
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex text-center'>
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: '/search',
                query: { ...searchParams, price },
              }}
              className={className}
              key={price}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          href={'/search'}
          className='flex justify-center border w-full text-reg font-light p-2 mt-4 rounded'
        >
          Clear Filter
        </Link>
      </div>
    </div>
  );
}
