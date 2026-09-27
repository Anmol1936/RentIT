# 🏠 RentIT

**RentIT** is a web-based rental platform that allows users to create, browse, manage, and review rental listings. The application provides user authentication, listing management, image uploads, reviews, and a MongoDB-backed data layer.

The project is built using **Node.js, Express.js, MongoDB, Mongoose, EJS, Passport.js, and Cloudinary**.

---

## ✨ Features

- 🔐 **User Authentication**
  - User registration and login
  - Session-based authentication using Passport.js
  - Secure logout functionality

- 🏠 **Rental Listings**
  - Browse available rental listings
  - View detailed information about a listing
  - Create new listings
  - Edit existing listings
  - Delete listings

- 👤 **Listing Ownership**
  - Users can manage their own listings
  - Authorization prevents users from modifying listings they do not own

- 🖼️ **Image Uploads**
  - Upload listing images
  - Images are stored and managed using Cloudinary
  - Supports JPG, JPEG, and PNG images

- ⭐ **Reviews & Ratings**
  - Users can leave reviews on listings
  - Ratings are supported from **1 to 5**
  - Reviews are associated with individual listings

- 🗄️ **MongoDB Database**
  - MongoDB is used for persistent application data
  - Mongoose provides schema modeling and database interaction
  - MongoDB is also used for session storage

- ⚠️ **Validation & Error Handling**
  - Joi is used to validate listing and review data
  - Custom error handling middleware is included
  - Flash messages provide success and error feedback

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend

- EJS
- EJS-Mate
- HTML
- CSS
- JavaScript

### Authentication

- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session

### Image Storage

- Cloudinary
- Multer
- Multer Storage Cloudinary

### Validation & Utilities

- Joi
- Method Override
- Connect Flash
- Connect Mongo
- Dotenv

---

## 📁 Project Structure

```text
RentIT/
│
├── controllers/
│   ├── listings.js
│   └── users.js
│
├── init/
│   └── ...
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── ...
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── expressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── listings/
│   ├── users/
│   └── ...
│
├── .gitignore
├── app.js
├── cloudConfig.js
├── middleware.js
├── package.json
├── package-lock.json
└── schema.js
