import Image from 'next/image';
import Link from 'next/link';
import { RestaurantCardType } from '../page';
import Price from './Price';
import Stars from './Stars';

interface Props {
  restaurant: RestaurantCardType;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className='group w-[270px] h-[280px] m-3 rounded overflow-hidden border cursor-pointer transform hover:-translate-y-2 hover:shadow-md transition duration-300'>
      <Link href={`/restaurant/${restaurant.slug}`}>
        <div className='relative w-[300px] h-[150px]'>
          <Image
            src={restaurant.main_image}
            alt=''
            style={{
              objectFit: 'cover',
            }}
            className='duration-300 group-hover:scale-110 group-hover:-translate-y-2'
            sizes='(33vw)'
            fill
          />
        </div>
        <div className='px-2 py-1'>
          <h3 className='font-bold text-2xl mb-2'>{restaurant.name}</h3>
          <div className='flex items-baseline'>
            <Stars reviews={restaurant.reviews} />
            <p className='ml-2'>
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? '' : 's'}
            </p>
          </div>
          <div className='flex text-reg font-light capitalize'>
            <p className=' mr-3'>{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
}
