Test commit

# 1

Основи JavaScript, Node.js, npm

# 2

Модулі, веб-сервер на http. Express.js.

Promises та їх переваги над callback-підходом.

Створити веб-сервер на Express:
```txt
// web server contains a list of numbers
//
// GET / 					- returns a list at JSON
// GET /at/:index 			- returns an item at index if it exists, 
//							  otherwise 404
// POST /:value 			- pushes value into list
// POST /at/:index/:value 	- insert value at index
// GET /length 				- returns list length
// DELETE / 				- removes last value
```

# 3 

Express + EJS, HTML форми, body-parser, busboy-body-parser для завантаження зображень

Створити шаблон із HTML-формою, у яку в значення вставляється інформація про ім'я, вік, стать користувача. Створити на сервері об'єкт користувача, з якого отримувати інформацію. Підтвердження форми робить POST запит до сервера, у якому оновлюються дані про користувача із форми.

Створити форму, що дозволяє завантажувати зображення на сервер. Додати біля форми відображення завантаженої на сервер картинки через URL та обробку GET запитів по відповідному URL для отримання байтів зображення.
