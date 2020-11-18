(()=>{"use strict";(()=>{const e=document.querySelector("main");window.main={CHECKOUT_ARR:["12:00","13:00","14:00"],CHECKIN_ARR:["12:00","13:00","14:00"],FEATURES_ARR:["wifi","dishwasher","parking","washer","elevator","conditioner"],TYPE_ARR:["palace","flat","house","bungalow"],PHOTOS_ARR:["http://o0.github.io/assets/images/tokyo/hotel1.jpg","http://o0.github.io/assets/images/tokyo/hotel2.jpg","http://o0.github.io/assets/images/tokyo/hotel3.jpg"],MIN_NAME_LENGTH:30,MAX_NAME_LENGTH:100,MAX_PRICE:1e6,CONTEINER:e,WIDTH_SIZE_PIN:32,HEIGHT_SIZE_PIN:75,BUTTON_WIDTH_SIZE_PIN:25,BUTTON_HEIGHT_SIZE_PIN:65}})(),window.utils={engToRuMap:{flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"}},(()=>{let e=(e,t,o,n,i)=>{let r=new XMLHttpRequest;r.responseType="json",r.addEventListener("load",(()=>{200===r.status?e(r.response):t("Статус ответа: "+r.status+" "+r.statusText)})),r.addEventListener("error",(()=>{t("Произошла ошибка соединения, повторите попытку")})),r.addEventListener("timeout",(()=>{t("Запрос не успел выполниться за "+r.timeout+"мс, перезагрузите страницу")})),r.timeout=1e4,r.open(o,n),r.send(i)};window.load=(t,o)=>{e(t,o,"GET","https://21.javascript.pages.academy/keksobooking/data")},window.backend={upload:(t,o,n)=>{e(o,n,"POST","https://21.javascript.pages.academy/keksobooking",t)}}})(),(()=>{let e=window.main.CONTEINER.querySelector(".ad-form"),t=window.main.CONTEINER.querySelector(".map"),o=window.main.CONTEINER.querySelectorAll("fieldset");for(let e of o)e.setAttribute("disabled",!0);let n=document.querySelector(".map__pin--main"),i=()=>{window.maps.active=!0,t.classList.remove("map--faded"),e.classList.remove("ad-form--disabled");for(let e of o)e.removeAttribute("disabled");window.load(window.filter.onSuccess,window.condition.onError),window.condition.loadFilters()};n.addEventListener("mousedown",(e=>{!1===window.maps.active&&0===e.button&&i()})),n.addEventListener("keydown",(e=>{!1===window.maps.active&&"Enter"===e.key&&(e.preventDefault(),i())})),window.maps={active:!1,openPinPage:n,map:t,adForm:e,fieldsetElements:o}})(),(()=>{let e={x:window.maps.openPinPage.style.left=Math.round(parseInt(window.maps.openPinPage.style.left,10)+window.main.WIDTH_SIZE_PIN),y:window.maps.openPinPage.style.top=parseInt(window.maps.openPinPage.style.top,10)+window.main.HEIGHT_SIZE_PIN},t=document.querySelector("#address");t.setAttribute("disabled",!0),t.value=`${e.x}, ${e.y}`;let o=window.main.CONTEINER.querySelector("#title");o.addEventListener("input",(()=>{let e=o.value.length;e<window.main.MIN_NAME_LENGTH?o.setCustomValidity(`Ещё ${window.main.MIN_NAME_LENGTH-e} симв.`):e>window.main.MAX_NAME_LENGTH?o.setCustomValidity(`Удалите лишние ${e-window.main.MAX_NAME_LENGTH} симв.`):o.setCustomValidity(""),o.reportValidity()}));let n=window.main.CONTEINER.querySelector("#price");n.addEventListener("input",(e=>{e.preventDefault(),n.value>window.main.MAX_PRICE?n.setCustomValidity(`Цена не может превышать сумму ${window.main.MAX_PRICE} рублей/ночь.`):n.setCustomValidity(""),n.reportValidity()}));let i=window.main.CONTEINER.querySelector("#room_number"),r=window.main.CONTEINER.querySelector("#capacity"),a=()=>{let e=i.value,t=r.value;"100"===e&&"0"!==t?(i.setCustomValidity("Дворец не для гостей"),r.setCustomValidity("Дворец не для гостей")):"100"===e&&"0"===t?(i.setCustomValidity(""),r.setCustomValidity("")):e<t&&"100"!==e?(i.setCustomValidity(`Количество гостей не может превышать ${e}`),r.setCustomValidity(`Количество гостей не может превышать ${e}`)):e>=t&&"100"!==e&&"0"===t?(i.setCustomValidity("Выберите количество гостей"),r.setCustomValidity("Выберите количество гостей")):e>=t&&"100"!==e&&(i.setCustomValidity(""),r.setCustomValidity(""))};i.addEventListener("change",(()=>{a(),i.reportValidity()})),r.addEventListener("change",(()=>{a(),r.reportValidity()}));let d=window.main.CONTEINER.querySelector("#timein"),s=window.main.CONTEINER.querySelector("#timeout");d.addEventListener("change",(()=>{s.value=d.value})),s.addEventListener("change",(()=>{d.value=s.value}));let l=window.main.CONTEINER.querySelector("#type"),m=()=>{let e=n.value;"bungalow"===l.value&&(n.placeholder=0),"flat"===l.value&&e<1e3&&(n.placeholder=1e3,n.setCustomValidity("Для квартиры минимальная стоимость составляет 1000 рублей")),"house"===l.value&&e<5e3&&(n.placeholder=5e3,n.setCustomValidity("Для дома минимальная стоимость составляет 5000 рублей")),"palace"===l.value&&e<1e4&&(n.placeholder=1e4,n.setCustomValidity("Для дворца минимальная стоимость составляет 10000 рублей"))};l.addEventListener("input",(()=>{m()})),n.addEventListener("input",(()=>{m(),n.reportValidity()})),window.maps.adForm.addEventListener("submit",(e=>{window.form.getValidationRooms(),window.form.roomNumber.reportValidity(),window.form.address.removeAttribute("disabled"),window.maps.adForm.checkValidity()&&window.backend.upload(new FormData(window.maps.adForm),window.condition.onFormSubmit,window.condition.onErrorUpload),window.form.address.setAttribute("disabled",!0),e.preventDefault()})),window.form={address:t,roomNumber:i,capacity:r,getValidationRooms:a,locationStart:e,getMinValuePrice:m,price:n,titleAdd:o}})(),(()=>{let e=document.querySelector("#pin").content.querySelector(".map__pin"),t=document.querySelector("#card").content.querySelector(".map__card"),o=document.querySelector("#success").content.querySelector(".success"),n=document.querySelector("#error").content.querySelector(".error");window.pinCard={renderCard:e=>{let o=t.cloneNode(!0);o.querySelector(".popup__title").textContent=e.offer.title,o.querySelector(".popup__text--address").textContent=e.offer.address,o.querySelector(".popup__text--price").textContent=`${e.offer.price}₽/ночь`,o.querySelector(".popup__type").textContent=window.utils.engToRuMap[e.offer.type],o.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`,o.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`;let n=o.querySelector(".popup__features");n.innerHTML="",e.offer.features.forEach(((t,o)=>{let i=document.createElement("li");i.textContent=e.offer.features[o],i.classList.add("popup__feature",`popup__feature--${e.offer.features[o]}`),n.append(i)})),n.querySelector(".popup__feature")||(n.style.display="none"),o.querySelector(".popup__description").textContent=e.offer.description;let i=o.querySelector(".popup__photos"),r=i.querySelector("img");return r.remove(),e.offer.photos.forEach(((t,o)=>{let n=r.cloneNode(!0);n.src=e.offer.photos[o],i.appendChild(n)})),o.querySelector(".popup__avatar").src=e.author.avatar,o},renderMark:t=>{let o=e.cloneNode(!0);o.style.left=t.location.x-window.main.BUTTON_WIDTH_SIZE_PIN+"px",o.style.top=t.location.y-window.main.BUTTON_HEIGHT_SIZE_PIN+"px";let n=o.querySelector("img");return n.src=t.author.avatar,n.alt="фото пользователя",o},renderSuccess:()=>o.cloneNode(!0),renderError:()=>n.cloneNode(!0)}})(),(()=>{let e=window.main.CONTEINER.querySelectorAll(".map__filters select"),t=window.main.CONTEINER.querySelector("#housing-features"),o=()=>{for(let e of window.condition.pins)e.remove();window.main.CONTEINER.querySelector(".map__card")&&(window.main.CONTEINER.querySelector(".map__card").remove(),document.removeEventListener("keydown",n))},n=e=>{let t=window.main.CONTEINER.querySelector(".map__card");"Escape"===e.key&&(e.preventDefault(),t.remove(),document.removeEventListener("keydown",n))},i=()=>{window.maps.adForm.reset(),window.image.removeImage(),window.form.address.value=`${window.form.locationStart.x}, ${window.form.locationStart.y}`,window.maps.openPinPage.style.left=window.form.locationStart.x+"px",window.maps.openPinPage.style.top=window.form.locationStart.y+"px"};window.maps.adForm.querySelector(".ad-form__reset").addEventListener("click",(e=>{e.preventDefault(),m(),i()}));let r=()=>{for(let t of e)t.setAttribute("disabled",!0);t.setAttribute("disabled",!0)};r();let a=()=>{window.main.CONTEINER.querySelector(".error").remove(),document.removeEventListener("click",a)},d=()=>{window.main.CONTEINER.querySelector(".success").remove(),document.removeEventListener("keydown",d),document.removeEventListener("click",d)},s=e=>{"Escape"===e.key&&(e.preventDefault(),a(),document.removeEventListener("keydown",s),document.removeEventListener("click",s))},l=e=>{"Escape"===e.key&&(e.preventDefault(),d(),document.removeEventListener("keydown",l))},m=()=>{window.maps.active=!1,window.maps.adForm.classList.add("ad-form--disabled"),window.maps.map.classList.add("map--faded");for(let e of window.maps.fieldsetElements)e.setAttribute("disabled",!0);r(),o(),window.main.CONTEINER.appendChild(window.pinCard.renderSuccess()),document.addEventListener("keydown",l),document.addEventListener("click",d)};window.condition={pins:[],pinsElements:[],onError:e=>{let t=document.createElement("div");t.style="padding: 20px; transform: translateX(-50%); z-index: 100; margin: 0 auto; text-align: center; background-color: #ffffff; border: 3px solid red; border-radius: 10px;",t.style.position="absolute",t.style.left="50%",t.style.top="50%",t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t),r()},onErrorUpload:()=>{window.main.CONTEINER.appendChild(window.pinCard.renderError()),document.addEventListener("keydown",s),window.main.CONTEINER.querySelector(".error__button").addEventListener("click",a),document.addEventListener("click",a)},onEscPressSuccess:l,onFormSubmit:()=>{m(),i()},onPopupEscPressCard:n,pinRemove:o,loadFilters:()=>{for(let t of e)t.removeAttribute("disabled");t.removeAttribute("disabled")}}})(),(()=>{let e,t=[],o=window.main.CONTEINER.querySelector(".map__filters"),n=window.main.CONTEINER.querySelector("#housing-type"),i=window.main.CONTEINER.querySelector("#housing-price"),r=window.main.CONTEINER.querySelector("#housing-rooms"),a=window.main.CONTEINER.querySelector("#housing-guests"),d=document.querySelector("#housing-features"),s=()=>{window.condition.pinRemove();let o=t.filter((e=>l(e)&&m(e)&&p(e)&&u(e)&&c(e)));e&&window.clearTimeout(e),e=window.setTimeout((()=>{window.render(o)}),500)},l=e=>"any"===n.value||e.offer.type===n.value,m=e=>"any"===i.value||("low"===i.value?e.offer.price<1e4:"middle"===i.value?e.offer.price>=1e4&&e.offer.price<5e4:"high"===i.value&&e.offer.price>=5e4),p=e=>"any"===r.value||e.offer.rooms===parseInt(r.value,10),u=e=>"any"===a.value||e.offer.guests===parseInt(a.value,10),c=e=>{let t=d.querySelectorAll("input:checked");return Array.from(t).every((t=>e.offer.features.includes(t.value)))};o.addEventListener("change",s),window.filter={onUpdateFilters:s,onSuccess:e=>{t=e,s()}}})(),(()=>{let e=document.querySelector(".map__pins");window.render=t=>{let o=document.createDocumentFragment();for(let e of t.slice(0,5))o.appendChild(window.pinCard.renderMark(e));window.condition.pinsElements=Array.from(t),e.appendChild(o),window.condition.pins=Array.from(window.main.CONTEINER.querySelectorAll(".map__pin:not(.map__pin--main)"))}})(),window.main.CONTEINER.querySelector(".map__pins").addEventListener("click",(e=>{if(!e.target.closest(".map__pin:not(.map__pin--main)"))return;let t=window.main.CONTEINER.querySelector(".map__card"),o=window.condition.pins.indexOf(e.target.closest(".map__pin:not(.map__pin--main)"));t&&(t.remove(),document.removeEventListener("keydown",window.condition.onPopupEscPressCard)),window.maps.map.appendChild(window.pinCard.renderCard(window.condition.pinsElements[o]));let n=window.main.CONTEINER.querySelector(".map__card"),i=window.main.CONTEINER.querySelector(".popup__close");document.addEventListener("keydown",window.condition.onPopupEscPressCard),i.addEventListener("click",(()=>{n.remove(),document.removeEventListener("keydown",window.condition.onPopupEscPressCard)}))})),window.maps.openPinPage.addEventListener("mousedown",(e=>{e.preventDefault();let t={x:e.clientX,y:e.clientY},o=!1,n=e=>{e.preventDefault(),o=!0;let n=t.x-e.clientX,i=t.y-e.clientY;t={x:e.clientX,y:e.clientY};let r=window.maps.openPinPage.offsetLeft-n+window.main.WIDTH_SIZE_PIN,a=window.maps.openPinPage.offsetTop-i+window.main.HEIGHT_SIZE_PIN;window.form.address.value=`${r}, ${a}`,a<630&&a>129&&(window.maps.openPinPage.style.top=window.maps.openPinPage.offsetTop-i+"px"),r<document.querySelector(".map__overlay").clientWidth&&r>0&&(window.maps.openPinPage.style.left=window.maps.openPinPage.offsetLeft-n+"px"),r<0&&(window.maps.openPinPage.style.left=0)},i=e=>{if(e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",i),o){let e=t=>{t.preventDefault(),window.maps.openPinPage.removeEventListener("click",e)};window.maps.openPinPage.addEventListener("click",e)}};document.addEventListener("mousemove",n),document.addEventListener("mouseup",i)})),(()=>{const e=["gif","jpg","jpeg","png"];let t=document.querySelector(".ad-form__field input[type=file]"),o=document.querySelector(".ad-form-header__preview img"),n=document.querySelector(".ad-form__upload input[type=file]"),i=document.querySelector(".ad-form__photo"),r=e=>{o.src=e},a=e=>{let t=document.createElement("img");t.src=e,t.width=70,t.height=70,t.style.borderRadius="5px",i.appendChild(t)},d=(t,o)=>{let n=t.files[0];if(n){let t=n.name.toLowerCase();if(e.some((e=>t.endsWith(e)))){let e=new FileReader;e.addEventListener("load",(e=>{o(e.target.result)})),e.readAsDataURL(n)}}};t.addEventListener("change",(()=>{d(t,r)})),n.addEventListener("change",(()=>{d(n,a)})),window.image={removeImage:()=>{o.src="img/muffin-grey.svg";let e=i.querySelectorAll("img");e&&e.forEach((e=>{e.remove()}))}}})()})();