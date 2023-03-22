import Image from 'next/image';

export default function Images({ images }: { images: string[] }) {
  return (
    <div>
      <h1 className='font-bold text-3xl mt-10 mb-7 border-b pb-5'>
        {images.length} photo{images.length > 1 ? 's' : ''}
      </h1>
      <div className='flex relative flex-wrap'>
        {images.map((image, index) => (
          <div key={index} className='relative w-56 h-44 mr-1 mb-1'>
            <Image
              src={image}
              key={index}
              alt=''
              fill
              style={{
                objectFit: 'cover',
              }}
              placeholder='blur'
              blurDataURL='/spinner.svg'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
