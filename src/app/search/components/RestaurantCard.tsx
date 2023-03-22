import Price from '@/src/app/components/Price';
import Stars from '@/src/app/components/Stars';
import { Cuisine, Location, PRICE, Review } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { calculateReviewsRatingAverage } from '@/utils/calculateReviewsRatingAverage';

interface Restaurant {
  id: number;
  location: Location;
  cuisine: Cuisine;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  reviews: Review[];
}

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const renderRatingText = () => {
    const rating = calculateReviewsRatingAverage(restaurant.reviews);

    if (rating > 4) return 'Awesome';
    else if (rating <= 4 && rating > 3) return 'Good';
    else if (rating <= 3 && rating > 0) return 'Average';
    else '';
  };

  return (
    <div className='border-b items-center flex pb-5 pt-5 ml-16'>
      <div className='relative w-44 h-36'>
        <Image
          src={restaurant.main_image}
          alt=''
          className='rounded object-cover'
          fill
          placeholder='blur'
          blurDataURL='/spinner.svg'
        />
      </div>
      <div className='pl-5'>
        <h2 className='text-3xl'>{restaurant.name}</h2>
        <div className='flex items-start mt-1'>
          <div className='flex mb-2'>
            {<Stars reviews={restaurant.reviews} />}
          </div>
          <p className='ml-2 text-sm'>{renderRatingText()}</p>
          {/* <p>{restaurant.reviews.length}</p> */}
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <Price price={restaurant.price} />
            <p className='mr-4 capitalize'>{restaurant.cuisine.name}</p>
            <p className='mr-4 capitalize'>{restaurant.location.name}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
