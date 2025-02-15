// console.log("1) СТАРТ СКРИПТА: загружен api.js, переходим к handleClientLoad().");
//
// // CLIENT_ID из Google Cloud Console (Тип: Web application)
// const CLIENT_ID = '316266346612-v1fji1khpru90g29kvlsc02rqlcr5v7h.apps.googleusercontent.com';
// // Нужные разрешения (scopes) для отправки писем
// const SCOPES = 'https://www.googleapis.com/auth/gmail.compose';
//
// // Получаем ссылки на кнопки
// const authorizeButton = document.getElementById('auth-button');
// const signoutButton = document.getElementById('signout-button');
// const sendButton = document.getElementById('send-button');
//
// /**
//  * Функция вызывается после загрузки api.js
//  */
// function handleClientLoad() {
//   console.log("2) handleClientLoad(): теперь загружаем client:auth2...");
//   // Загружаем нужные модули gapi
//   gapi.load('client:auth2', initClient);
// }
//
// /**
//  * Инициализация клиента API
//  */
// async function initClient() {
//   console.log("3) initClient(): начинаем инициализацию gapi.client...");
//
//   try {
//     // Подключаем discoveryDocs для Gmail v1, чтобы получить gapi.client.gmail
//     await gapi.client.init({
//       clientId: CLIENT_ID,
//       scope: SCOPES,
//       discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"]
//     });
//
//     console.log("4) initClient(): gapi.client.init() завершилась УСПЕШНО.");
//
//     // Подписываемся на изменения статуса авторизации
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
//
//     // Проверяем текущий статус (вошёл / не вошёл)
//     const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
//     console.log("5) initClient(): Текущий статус isSignedIn =", isSignedIn);
//     updateSignInStatus(isSignedIn);
//
//   } catch (error) {
//     console.error("3.1) initClient(): ОШИБКА при gapi.client.init:", error);
//   }
// }
//
// /**
//  * Проверяет статус входа и отображает/скрывает кнопки
//  */
// function updateSignInStatus(isSignedIn) {
//   console.log("6) updateSignInStatus(): isSignedIn =", isSignedIn);
//
//   if (isSignedIn) {
//     // Пользователь вошёл
//     console.log("   -> Пользователь авторизован, показываем кнопки 'Выйти' и 'Отправить'.");
//     authorizeButton.style.display = 'none';
//     signoutButton.style.display = 'inline-block';
//     sendButton.style.display = 'inline-block';
//   } else {
//     // Пользователь НЕ вошёл
//     console.log("   -> Пользователь НЕ авторизован, показываем кнопку 'Войти'.");
//     authorizeButton.style.display = 'inline-block';
//     signoutButton.style.display = 'none';
//     sendButton.style.display = 'none';
//   }
// }
//
// /**
//  * Нажатие кнопки "Войти"
//  */
// authorizeButton.onclick = () => {
//   console.log("7) authorizeButton: Нажата кнопка Войти, вызываем signIn()...");
//   gapi.auth2.getAuthInstance().signIn().then(() => {
//     console.log("   -> signIn() fulfilled!");
//   }).catch(err => {
//     console.error("   -> signIn() ОШИБКА:", err);
//   });
// };
//
// /**
//  * Нажатие кнопки "Выйти"
//  */
// signoutButton.onclick = () => {
//   console.log("8) signoutButton: Нажата кнопка Выйти, вызываем signOut()...");
//   gapi.auth2.getAuthInstance().signOut().then(() => {
//     console.log("   -> signOut() fulfilled!");
//   }).catch(err => {
//     console.error("   -> signOut() ОШИБКА:", err);
//   });
// };
//
// /**
//  * Нажатие кнопки "Отправить тестовое письмо"
//  */
// sendButton.onclick = async () => {
//   console.log("9) sendButton: Нажата кнопка 'Отправить письмо'");
//
//   // Проверим ещё раз, что пользователь авторизован
//   const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
//   console.log("   -> isSignedIn перед отправкой =", isSignedIn);
//   if (!isSignedIn) {
//     console.warn("   -> Пользователь не авторизован, отправка отменена.");
//     return;
//   }
//
//   // Формируем простое письмо
//   const to = 'test@example.com';
//   const subject = 'Test from Gmail API';
//   const message = 'Привет! Это тестовое письмо, отправленное из Gmail API.';
//   const email = [
//     `To: ${to}`,
//     'Content-Type: text/plain; charset="UTF-8"',
//     `Subject: ${subject}`,
//     '',
//     message
//   ].join('\r\n');
//
//   // Кодируем Base64 URL-SAFE
//   const base64EncodedEmail = btoa(email)
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_');
//
//   console.log("   -> Закодированное письмо (первые 50 символов):", base64EncodedEmail.slice(0, 50) + "...");
//
//   try {
//     console.log("   -> Вызываем gapi.client.gmail.users.messages.send...");
//     const response = await gapi.client.gmail.users.messages.send({
//       userId: 'me',
//       resource: {
//         raw: base64EncodedEmail
//       }
//     });
//
//     console.log("   -> УСПЕХ! Ответ сервера:", response);
//     alert('Письмо успешно отправлено!');
//   } catch (err) {
//     console.error("   -> ОШИБКА при отправке письма:", err);
//     alert('Ошибка при отправке письма (см. консоль).');
//   }
// };
//
// // Запускаем процесс после загрузки
// window.onload = () => {
//   console.log("1.1) window.onload -> вызываем handleClientLoad()");
//   handleClientLoad();
// };
