Here's a detailed README for your project:

---

# MallorcaApp 🌴 (React + Redux Toolkit + Firebase + Tailwind CSS)

<!-- ![Login Page](src/assets/screenshots/login-page.png)
![Profile Page](src/assets/screenshots/profile-page.png)
![Stories Feature](src/assets/screenshots/stories-feature.png) -->

An immersive web application designed to enhance the user experience of exploring and planning visits to Mallorca. This app integrates social authentication, dynamic content, and state management for seamless navigation and interaction.

---

## 📋 Table of Contents
- [MallorcaApp 🌴 (React + Redux Toolkit + Firebase + Tailwind CSS)](#mallorcaapp--react--redux-toolkit--firebase--tailwind-css)
  - [📋 Table of Contents](#-table-of-contents)
  - [🌍 Overview](#-overview)
  - [⚙️ Technologies Used](#️-technologies-used)
  - [🌟 Features](#-features)
    - [General Features](#general-features)
    - [Authentication](#authentication)
    - [User Profile](#user-profile)
    - [Stories](#stories)
  - [💡 Core Functionalities](#-core-functionalities)
  - [🚀 Future Improvements](#-future-improvements)
  - [🛠️ Installation](#️-installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [🖥️ Usage](#️-usage)
    - [Pages and Routes](#pages-and-routes)
  - [📂 Project Structure](#-project-structure)
  - [🤝 Contributing](#-contributing)
  - [📜 License](#-license)

---

## 🌍 Overview
MallorcaApp provides users with tools to explore Mallorca's attractions, manage personalized stories, and seamlessly authenticate using social media or email/password login. The application leverages Firebase for authentication and storage while ensuring a responsive design for all devices.

---

## ⚙️ Technologies Used
- **React**: Component-based UI development.
- **Redux Toolkit**: State management for scalable and maintainable logic.
- **Firebase**:
  - **Authentication**: Google, Facebook, and Email login.
  - **Firestore**: Real-time NoSQL database.
  - **Cloud Storage**: Storing user-uploaded images securely.
- **Tailwind CSS**: For elegant, responsive, and customizable styling.
- **React Router**: SPA navigation with protected routes.
- **Vite**: Modern development environment for faster builds and development.
- **React Icons**: Iconography to enhance the UI.

---

## 🌟 Features
### General Features
- **Loading Screen**: Displays a splash screen with the app logo while assets load.
- **Starter Page**: Engaging introduction with a looping video background and options for registration or login.

### Authentication
- **Email/Password Authentication**: Includes validations for secure input.
- **Social Login**: Log in or register using Google and Facebook.
- **Forgot Password**: Reset passwords via email.

### User Profile
- **Dynamic User Profile**: Displays user information such as profile picture, name, and email.
- **Profile Editing**: Upload custom profile pictures and update usernames.

### Stories
- **Custom Stories**: Users can upload and view photo collections with a modal viewer.
- **Interactive Hover Effects**: Smooth animations on hover for enhanced user engagement.

---

## 💡 Core Functionalities
1. **Authentication**:
   - Secure login via Firebase Auth.
   - Social logins (Google, Facebook).
   - Email/password validation and reset functionality.
2. **User Profile Management**:
   - Dynamic updates for username and profile picture.
   - Integration with Firebase Firestore for persistent storage.
3. **Explore Stories**:
   - Upload, view, and interact with stories.
   - Stories organized into categories.
   - Fullscreen modal for image viewing.
4. **Responsive Design**:
   - Tailwind CSS ensures seamless performance across devices.
5. **Language Support**:
   - Multi-language capability (English and Spanish).

---

## 🚀 Future Improvements
- **Dark Mode Enhancements**: Add custom themes for dark/light mode.
- **Search and Filter Stories**: Allow users to search and filter uploaded stories.
- **Favorites Synchronization**: Store and sync user favorites in Firestore.
- **Offline Mode**: Caching features for better performance without internet.
- **Analytics**: Integrate Firebase Analytics to track user interactions.

---

## 🛠️ Installation

### Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **Firebase Project**: Configure Firebase and obtain your `firebaseConfig`.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mallorca-app.git
   cd mallorca-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   VITE_FIREBASE_API_KEY=<your-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
   VITE_FIREBASE_APP_ID=<your-app-id>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```

---

## 🖥️ Usage
### Pages and Routes
1. **Loading Page (`/`)**: Initial splash screen.
2. **Starter Page (`/starter`)**: Introduction and authentication options.
3. **Register Page (`/register`)**: Create a new account with email or social login.
4. **Login Page (`/login`)**: Access an existing account.
5. **Home Page (`/home`)**: Explore stories and user content.
6. **Profile Page (`/profile`)**: Manage user information and view stories.

---

## 📂 Project Structure

```
mallorca-app/
├── src/
│   ├── assets/             # Images, videos, and static files
│   ├── components/         # Reusable UI components
│   ├── features/           # Redux slices for state management
│   ├── firebaseConfig.js   # Firebase configuration
│   ├── pages/              # Application pages
│   ├── styles/             # Global and utility styles
│   ├── App.jsx             # Main application entry
│   ├── index.css           # Tailwind and global CSS
│   └── main.jsx            # Application entry point
└── ...
```

---

## 🤝 Contributing
Contributions are welcome! Here’s how you can help:
- **Submit Bug Reports**: Use GitHub Issues to report bugs or request features.
- **Create Pull Requests**: Fork the repo, make changes, and submit a PR.

---

## 📜 License
This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

Let me know if you'd like any additional details or modifications to this README!