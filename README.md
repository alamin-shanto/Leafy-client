# 🌿 Leafy – Smart Plant Care Assistant

Leafy is a modern, user-friendly web app designed for plant lovers to effortlessly manage and monitor their plants. Whether you're a beginner or an experienced plant parent, Leafy provides essential tools, care tips, and an intuitive interface to keep your green companions healthy and thriving.

---

## 🔗 Live Demo

[🌱 Visit Leafy Live](https://leafy-client.netlify.app/#/)

---

![Leafy Screenshot](https://github.com/user-attachments/assets/4c7033a3-6bfd-472c-8d92-527c1538a3a5)

---

## 🚀 Tech Stack

- ⚡️ [Vite](https://vitejs.dev/) — lightning-fast build & dev tool  
- 🧠 [React](https://reactjs.org/) — component-driven UI  
- 🎨 [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) — responsive and elegant styling  
- 🔁 [React Router DOM](https://reactrouter.com/) — seamless routing & navigation  
- 🔥 [Firebase](https://firebase.google.com/) — authentication and backend services  
- 🍭 [SweetAlert2](https://sweetalert2.github.io/) — sleek popup alerts  
- 🧿 [Lucide React](https://lucide.dev/) — clean, modern icons  
- ✨ Additional libs: React Hot Toast, Swiper, React Tooltip

---

## ✨ Core Features

- 🔐 Secure login & registration via Email/Password and Google OAuth  
- 🌿 Manage and monitor your plant collection dynamically  
- 💡 Expert plant care tips and recommendations  
- 🔍 Search and filter plants easily  
- 🔔 Stylish, user-friendly notifications and alerts  
- 📱 Fully responsive for desktop, tablet, and mobile devices  
- 🚪 Protected routes with smooth logout and profile management  

---

## 🗂️ Project Structure

```
frontend/
┣ 📂assets
┃ ┗ 📂Animations
┣ 📂Components
┃ ┣ 📜Banner.jsx
┃ ┣ 📜BeginnerFriendlyPlants.jsx
┃ ┣ 📜Footer.jsx
┃ ┣ 📜Layout.jsx
┃ ┣ 📜Navbar.jsx
┃ ┣ 📜NewPlants.jsx
┃ ┣ 📜Spinner.jsx
┃ ┣ 📜SubSpinner.jsx
┃ ┣ 📜ThemeToggle.jsx
┃ ┣ 📜TopPlantCareMistakes.jsx
┃ ┗ 📜WhyChooseLeafy.jsx
┣ 📂Context
┃ ┣ 📜AuthContext.jsx
┃ ┗ 📜AuthProvider.jsx
┣ 📂Firebase
┃ ┗ 📜firebase.jsx
┣ 📂Pages
┃ ┣ 📜AddPlants.jsx
┃ ┣ 📜AllPlants.jsx
┃ ┣ 📜Home.jsx
┃ ┣ 📜LogIn.jsx
┃ ┣ 📜MyPlants.jsx
┃ ┣ 📜NotFound.jsx
┃ ┣ 📜PlantDetails.jsx
┃ ┣ 📜PlantNotFound.jsx
┃ ┣ 📜Register.jsx
┃ ┗ 📜UpdatePlant.jsx
┣ 📂Routes
┃ ┣ 📜PrivateRoutes.jsx
┃ ┗ 📜Router.jsx
┣ 📜App.css
┣ 📜App.jsx
┣ 📜index.css
┗ 📜main.jsx

backend/
┣ 📂middleware
┃ ┗ 📜verifyToken.js
┣ 📂public
┃ ┗ 📜index.html
┣ 📜.env
┣ 📜.gitignore
┣ 📜admin-key.json
┣ 📜firebase.json
┣ 📜index.js
┣ 📜keyConvert.js
┣ 📜package.json
┗ 📜vercel.json

```


---

## ⚙️ Local Setup Guide

1️⃣ **Clone the repo**  
```
git clone https://github.com/<your-username>/leafy.git
cd leafy
```

2️⃣ Setup Frontend

```
Copy
Edit
cd frontend
npm install
npm run dev    # Runs on http://localhost:5173
```

3️⃣ Setup Backend

```
cd ../backend
npm install
# Create a .env file (see example below)
npm run dev    # or node index.js (default port 5000)
```

4️⃣ .env.example

# Firebase Admin SDK Credentials
```
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
```
# MongoDB
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```
# JWT Secret

```
JWT_SECRET=your_jwt_secret
```

5️⃣ Security Tips

Add .env and admin-key.json to .gitignore

Never commit your secrets or private keys

Use environment variables for configuration

# 🚀 Deployment Recommendations
Frontend: Deploy on Netlify
➡️ Set all environment variables prefixed with VITE_ in your Netlify dashboard.

Backend: Deploy on Vercel or similar
➡️ Configure your .env securely on the platform.

Firebase Auth: Add your deployed domains to Firebase Authorized Domains to enable smooth authentication.

# 🤝 Contributing
This project is a personal portfolio and learning showcase.
Feel free to fork, explore, and submit pull requests to help improve it!

# 🔒 License
© 2025 Mohammad Al-Amin | Licensed under MIT
```
🌿 “Helping plants thrive, one leaf at a time.”
```
