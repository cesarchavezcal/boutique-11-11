import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Cloudinary } from '../../components';
import { IoBagCheckOutline } from 'react-icons/io5';

export function Index() {
  const router = useRouter();

  const { data } = useSession();
  const [img, setImg] = useState<string[]>([]);
  const [imageSelected, setImageSelected] = useState<any>();
  console.log(img.length);

  const imageHandler = (newValue) => {
    setImg((current) => [...current, newValue]);
    console.log(img);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function submitHandler(values) {
    const orderObject = {
      cost: parseInt(values.cost),
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
    }).then(() => {
      router.push('/');
    });
  }

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'zxiob9mp');

    fetch('https://api.cloudinary.com/v1_1/dkkvyjija/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="container p-4 min-h-[calc(100vh-4rem)] grid grid-cols-1 gap-4 content-start">
      <section className="grid gap-4 bg-white shadow rounded-lg p-4 justify-center h-fit grid-cols-1">
        <div className="flex justify-center flex-wrap">
          <h1 className="text-lg text-rose-700 font-normal w-full text-center">
            Genera tu orden
          </h1>
          <p className="text-sm font-semibold text-center text-gray-600">
            Utiliza el siguiente formulario para crear tu orden
          </p>
        </div>
        <hr />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 gap-5"
        >
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="images" className="text-xs text-gray-600">
              <span className="rounded-full border w-4 h-4 inline-block border-rose-200  text-center leading-4 mr-2">
                1
              </span>
              Selecciona tus imágenes
            </label>
            <Cloudinary imageHandler={imageHandler} />
            <div className="mt-2 flex gap-4 flex-wrap rounded border border-solid p-2 w-full">
              <p className="text-xs font-normal text-center text-gray-600 w-full">
                Aquí apareceran las imágenes de tus pedidos
              </p>
              {img.map((image, i) => {
                return (
                  <figure
                    key={i}
                    className="aspect-square w-full h-40 relative border border-gray-200"
                  >
                    <Image
                      src={image}
                      alt={image}
                      width={320}
                      className="object-cover"
                      layout="fill"
                    />
                  </figure>
                );
              })}
            </div>
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="rounded-full border w-4 h-4 inline-block border-rose-200  text-center leading-4 mr-2">
                2
              </span>
              Selecciona la tienda
            </label>
            <select
              {...register('store')}
              className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg text-gray-600"
            >
              <option value="Shein" selected>
                Shein
              </option>
              <option value="Flexi">Flexi</option>
              <option value="Privalia">Privalia</option>
            </select>
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="rounded-full border w-4 h-4 inline-block border-rose-200  text-center leading-4 mr-2">
                3
              </span>
              Agrega tus comentarios
            </label>
            <textarea
              placeholder="Comentarios"
              className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
              {...register('comments')}
            />
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="rounded-full border w-4 h-4 inline-block border-rose-200  text-center leading-4 mr-2">
                4
              </span>
              Agrega el costo de tu pedido
            </label>
            <input
              type="number"
              inputMode="decimal"
              autoComplete="off"
              placeholder="$00.00"
              className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
              {...register('cost')}
            />
          </section>
          <label htmlFor="store" className="text-xs text-gray-600">
            🎉 ¡Listo! Genera tu pedido
          </label>
          <button
            type="submit"
            className="inline-flex justify-center gap-2 items-center relative px-4 py-2 border rounded-full shadow-lg bg-rose-500 text-white"
          >
            <span className="text-sm">¡Haz mi pedido!</span>
            <IoBagCheckOutline />
          </button>
        </form>
      </section>
    </section>
  );
}

export default Index;
