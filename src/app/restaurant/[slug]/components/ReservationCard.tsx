'use client';

import { times, partySize as partySizes } from '@/data';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import useAvailabilities from '@/hooks/useAvailabilities';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { convertToDisplayTime, Time } from '@/utils/convertToDisplayTime';

export default function ReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { data, loading, error, fetchAvailabilities } = useAvailabilities();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState('2');
  const [day, setDay] = useState(new Date().toISOString().split('T')[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
  };

  const filterTimesByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesWithinWindow;
  };

  return (
    <div className='fixed w-[15%] bg-white rounded px-3 py-2 shadow'>
      <div className=' text-center align-middle border-b font-bold'>
        <h4 className='mx-auto text-lg mb-2'>Make a Reservation</h4>
      </div>
      <div className='my-3 flex flex-col'>
        <label htmlFor=''>Party size</label>
        <select
          name=''
          className='py-3 border-b font-light cursor-pointer focus:outline-none'
          id=''
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className='py-3 border-b font-light text-reg w-28 cursor-pointer focus:outline-none'
            dateFormat='MMMM d'
            wrapperClassName='w-[48%]'
          />
        </div>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Time</label>
          <select
            name=''
            id=''
            className='py-3 border-b font-light focus:outline-none'
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimesByRestaurantOpenWindow().map((time) => (
              <option key={time.displayTime} value={time.time}>
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='mt-5'>
        <button
          className='bg-red-600 rounded w-full px-4 text-white font-bold h-14 hover:bg-red-700 duration-300'
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color='inherit' /> : 'Find a time'}
        </button>
      </div>
      {data && data.length ? (
        <div className='mt-4'>
          <p className='text-reg'>Select a time</p>
          <div className='flex flex-wrap mt-2'>
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className='bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3 hover:bg-red-700 duration-300'
                >
                  <p className='text-sm font-bold'>
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className='bg-gray-300 p-2 w-24 h-[35.5px] mb-3 rounded mr-3'></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
