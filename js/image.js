'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const HEADER_PREVIEW = `img/muffin-grey.svg`;
const TypePhotoOptions = {
  WIDTH: 70,
  HEIGHT: 70,
  BORDER_RADIUS: 5
};

let userPhotoLoad = document.querySelector(`.ad-form__field input[type=file]`);
let userPhotoImage = document.querySelector(`.ad-form-header__preview img`);
let typePhotoLoad = document.querySelector(`.ad-form__upload input[type=file]`);
let typePhotoImage = document.querySelector(`.ad-form__photo`);

let changeUserPhoto = (result) => {
  userPhotoImage.src = result;
};

let changeTypePhoto = (result) => {
  let newPhoto = document.createElement(`img`);
  newPhoto.src = result;
  newPhoto.width = TypePhotoOptions.WIDTH;
  newPhoto.height = TypePhotoOptions.HEIGHT;
  newPhoto.style.borderRadius = TypePhotoOptions.BORDER_RADIUS + `px`;
  typePhotoImage.appendChild(newPhoto);
};

let loadImage = (element, action) => {
  let file = element.files[0];

  if (file) {
    let fileName = file.name.toLowerCase();

    let hasMatchedFileType = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (hasMatchedFileType) {
      let reader = new FileReader();

      reader.addEventListener(`load`, (evt) => {
        action(evt.target.result);
      });

      reader.readAsDataURL(file);
    }
  }
};

let onUserPhotoChange = () => {
  loadImage(userPhotoLoad, changeUserPhoto);
};
let onTypePhotoChange = () => {
  loadImage(typePhotoLoad, changeTypePhoto);
};

userPhotoLoad.addEventListener(`change`, onUserPhotoChange);
typePhotoLoad.addEventListener(`change`, onTypePhotoChange);

let removeImage = () => {
  userPhotoImage.src = HEADER_PREVIEW;
  let typePhotos = typePhotoImage.querySelectorAll(`img`);
  if (typePhotos) {
    typePhotos.forEach((item) => {
      item.remove();
    });
  }
};

window.image = {
  removeImage,
};
