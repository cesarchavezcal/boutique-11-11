import Script from 'next/script';
import { useEffect } from 'react';
import { IoImagesOutline } from 'react-icons/io5';
// Hack to fix the cloudinary issue
declare global {
  interface Window {
    cloudinary: any;
  }
}

export const Cloudinary = ({ imageHandler }) => {
  useEffect(() => {
    const myWidget: Window = window.cloudinary?.createUploadWidget(
      {
        cloudName: 'dkkvyjija',
        uploadPreset: 'zxiob9mp',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
        }
        if (result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info.path);
          const url = `https://res.cloudinary.com/dkkvyjija/image/upload/f_auto,q_auto/${result.info.path}`;

          imageHandler(url);
        }
      }
    );

    const cloudinaryButton = document.getElementById('cloudinary-widget');

    cloudinaryButton.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        myWidget.open();
      },
      false
    );
  }, [imageHandler]);

  return (
    <>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        strategy="beforeInteractive"
      />
      <button
        id="cloudinary-widget"
        className="inline-flex justify-center gap-2 items-center relative px-4 py-2 border rounded-full shadow-lg bg-rose-500 text-white w-full"
      >
        <span className="text-sm">Sube tus imágenes de pedidos</span>
        <IoImagesOutline />
      </button>
    </>
  );
};
