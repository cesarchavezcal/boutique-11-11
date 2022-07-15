import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Cloudinary } from '../components';

export function Index() {
  const router = useRouter();

  const { data } = useSession();
  const [img, setImg] = useState<string[]>([]);

  const imageHandler = (newValue) => {
    setImg((current) => [...current, newValue]);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function submitHandler(values) {
    console.log(img);
    const orderObject = {
      address: data.user.address,
      clientId: data.user.id,
      comments: values.comments,
      images: img,
      phone: data.user.phone,
      store: values.store,
      status: 'No pedido',
    };

    await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify(orderObject),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      router.push('/profile');
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white shadow rounded-lg mb-6 p-4 grid gap-2"
      >
        <Cloudinary imageHandler={imageHandler} />
        <div className="mt-2 flex flex-wrap rounded border border-solid p-2">
          {img.map((image, i) => {
            return (
              <img
                key={i}
                src={image}
                alt={image}
                width={320}
                className="mr-2"
              />
            );
          })}
        </div>
        <select
          {...register('store')}
          className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
        >
          <option disabled>Tienda</option>
          <option value="Shein">Shein</option>
          <option value="Flexi">Flexi</option>
          <option value="Privalia">Privalia</option>
        </select>
        <textarea
          placeholder="Comentarios"
          className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
          {...register('comments')}
        />
        <button
          className="flex justify-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Index;
