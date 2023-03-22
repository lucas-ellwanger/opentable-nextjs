import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime';
import Image from 'next/image';
import { format } from 'date-fns';

export default function Header({
  image,
  name,
  date,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  partySize: string;
}) {
  const [day, time] = date.split('T');

  return (
    <div>
      <h3 className='font-bold'>You&apos;re almost done!</h3>
      <div className='mt-5 flex'>
        <div className='relative w-[180px] h-[100px] overflow-hidden'>
          <Image
            src={image}
            alt=''
            style={{
              objectFit: 'cover',
            }}
            className='rounded'
            sizes='(33vw)'
            fill
            placeholder='blur'
            blurDataURL='/spinner.svg'
          />
        </div>
        <div className='ml-4'>
          <h1 className='text-3xl font-bold'>{name}</h1>
          <div className='flex mt-3'>
            <p className='mr-6'>{format(new Date(date), 'ccc, LLL d')}</p>
            <p className='mr-6'>{convertToDisplayTime(time as Time)}</p>
            <p className='mr-6'>
              {partySize} {parseInt(partySize) === 1 ? 'person' : 'people'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// http://localhost:3000/reserve/vivaan-fine-indian-cuisine-ottawa?date=2023-02-15T15:00:00.000Z&partySize=4
