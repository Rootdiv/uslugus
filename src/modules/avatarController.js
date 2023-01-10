import Croppie from 'croppie';
import 'croppie/croppie.css';

export const avatarController = ({ inputFile, uploadResult }) => {
  const upload = document.querySelector(inputFile);
  const avatar = document.querySelector(uploadResult);
  avatar.style.display = 'none';

  const crp = new Croppie(avatar, {
    boundary: { width: 300, height: 300 },
    viewport: { width: 200, height: 200, type: 'circle' },
  });

  const readImage = ({ target: input }) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('loadend', event => {
        avatar.style.display = 'block';
        crp.bind({ url: event.target.result });
      });
      reader.readAsDataURL(input.files[0]);
    }
  };

  upload.addEventListener('change', readImage);

  return crp;
};
