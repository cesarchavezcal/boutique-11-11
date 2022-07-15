import Script from 'next/script';
import { useEffect } from 'react';

declare const window: any;

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
        className="flex justify-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg"
      >
        Subir Imágenes de Pedidos
      </button>
    </>
  );
};
