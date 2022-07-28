/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { PageHeader, Spinner, ErrorMessage } from './../../components';
import {
  IoBagCheckOutline,
  IoBagOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import Script from 'next/script';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export function Index() {
  const router = useRouter();

  const { data } = useSession();
  interface ImageI {
    file: HTMLInputElement | unknown;
    base64: string | ArrayBuffer;
  }
  // States
  const [images, setImages] = useState<ImageI[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const { handleSubmit, register } = useForm();

  async function submitHandler(values) {
    setIsSubmitting(true);

    if (images.length === 0) {
      setImageError(true);
      setIsSubmitting(false);
      return;
    }

    const uploadImages = images.map((image) => {
      const formData = new FormData();

      formData.append('file', image.file as string);
      formData.append('upload_preset', 'zxiob9mp');

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/dkkvyjija/image/upload',
          formData,
          {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
          }
        )
        .then((response) => {
          return (
            'https://res.cloudinary.com/dkkvyjija/image/upload/f_auto/' +
            response.data.public_id
          );
        });
    });

    axios.all(uploadImages).then((uploadedImages) => {
      const orderObject = {
        cost: parseInt(values.cost),
        address: data.user.address,
        clientId: data.user.id,
        comments: values.comments,
        images: uploadedImages,
        phone: data.user.phone,
        store: values.store,
        status: 'No pedido',
        coupon: values.coupon,
      };

      fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderObject),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          setIsSubmitting(false);
          router.push('/');
        })
        .catch((err) => setIsSubmitting(false));
    });
  }

  /**
   * Delete the selected image
   * @param id
   */
  function handleDeleteClick(id) {
    const removeItem = images.filter((image, i) => {
      return i !== id;
    });

    setImages(removeItem);
  }

  const onDrop = useCallback((acceptedFiles, rejectedFiled) => {
    acceptedFiles.forEach((file) => {
      const base64Reader = new FileReader();

      base64Reader.readAsDataURL(file);

      base64Reader.onload = () => {
        setImages((prevState: ImageI[]) => [
          ...prevState,
          { base64: base64Reader.result, file },
        ]);
      };
    });
  }, []);
  // Cloudinary Hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
  });

  return (
    <>
      {isSubmitting && <Spinner />}
      <section className="grid gap-4">
        <PageHeader
          title="Crear Orden"
          description="Aquí podrás crear tu orden"
          icon={<IoBagOutline className="text-2xl" />}
        />
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="grid grid-cols-1 gap-5 rounded-3xl bg-white p-4"
        >
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="images" className="text-xs text-gray-600">
              <span className="mr-2 inline-block h-4 w-4 rounded-full border  border-rose-200 text-center leading-4">
                1
              </span>
              🖼 Selecciona tus imágenes
            </label>
            <div
              className={`bg-background border-apricot/20 text-black-light w-full rounded-3xl border border-dashed p-4 text-center ${
                imageError && 'border-danger border-2 border-double'
              }`}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && 'Agrega las imágenes de tus pedidos'}
            </div>
            {imageError && (
              <ErrorMessage message="Necesitas agregar imágenes de tu pedido" />
            )}

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-1">
                {images.map((image, i) => {
                  return (
                    <div key={i} className="relative">
                      <img
                        src={image.base64 as string}
                        alt="Imagen de pedido"
                      />
                      <button
                        className="bg-danger text-light absolute bottom-0 left-0 flex items-center gap-1 rounded-full py-1 px-3 text-sm text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteClick(i);
                        }}
                      >
                        <IoTrashOutline />
                        Eliminar foto
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="mr-2 inline-block h-4 w-4 rounded-full border  border-rose-200 text-center leading-4">
                2
              </span>
              🏪 Selecciona la tienda
            </label>
            <select
              {...register('store')}
              className="bg-background rounded-tg placeholder:text-black-light text-apricot-dark w-full appearance-none rounded-lg py-3 px-4"
            >
              <option value="Shein">Shein</option>
              <option value="Flexi">Flexi</option>
              <option value="Privalia">Privalia</option>
            </select>
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="mr-2 inline-block h-4 w-4 rounded-full border  border-rose-200 text-center leading-4">
                3
              </span>
              📃 Agrega tus comentarios
            </label>
            <textarea
              placeholder="Comentarios"
              className="bg-background rounded-tg placeholder:text-black-light text-apricot-dark w-full appearance-none rounded-lg py-3 px-4"
              {...register('comments')}
            />
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="mr-2 inline-block h-4 w-4 rounded-full border  border-rose-200 text-center leading-4">
                4
              </span>
              💵 Agrega el costo de tu pedido
            </label>
            <input
              type="number"
              inputMode="decimal"
              autoComplete="off"
              placeholder="$00.00"
              className="bg-background rounded-tg placeholder:text-black-light text-apricot-dark w-full appearance-none rounded-lg py-3 px-4"
              {...register('cost')}
            />
          </section>
          <section className="col-span-1 flex flex-wrap gap-2">
            <label htmlFor="store" className="text-xs text-gray-600">
              <span className="mr-2 inline-block h-4 w-4 rounded-full border  border-rose-200 text-center leading-4">
                4
              </span>
              🎫 ¿Tienes un código de promoción?
            </label>
            <input
              type="text"
              placeholder="Código de cupón"
              className="bg-background rounded-tg placeholder:text-black-light text-apricot-dark w-full appearance-none rounded-lg py-3 px-4"
              {...register('coupon')}
            />
          </section>
          <label htmlFor="store" className="text-xs text-gray-600">
            🎉 ¡Listo! Genera tu pedido
          </label>
          <button
            type="submit"
            className="bg-apricot relative inline-flex w-full items-center justify-center gap-2 rounded-full py-3 px-4 text-center text-white shadow-lg"
          >
            ¡Haz mi pedido!
            <IoBagCheckOutline />
          </button>
        </form>
      </section>
      <Script src="https://widget.cloudinary.com/v2.0/global/all.js" />
    </>
  );
}

export default Index;
