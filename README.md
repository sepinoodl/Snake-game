#  🐍 Snake Game
A responsive, retro-style Snake game rebuilt with **HTML**, **CSS**, and **vanilla JavaScript**, featuring smarter sound control, mobile-friendly gestures, and persistent high scores. This version is a personal fork with thoughtful improvements to gameplay logic, audio handling, and user experience.

## ✨ Features

- Smooth keyboard controls and swipe gestures for mobile
- Mute/unmute toggle with automatic canvas focus recovery
- Background music and game-over sound effects
- Local storage support — your high score is saved across sessions
- Responsive design for desktop and mobile screens
- Clean code structure with modular logic and improved readability

## 📸 Preview

![Screenshot](/Screenshot.jpg)

## 🚀 Live Demo

👉 [Play the game here](https://sepinoodl.github.io/Snake-game/)

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, media queries, custom styling)
- JavaScript (ES6)
- LocalStorage API
- Audio API
- Persian-friendly font: Vazir

## 📁 Folder Structure

├── index.html
├── style.css
├── script.js
├── font.css
├── Music/
│   ├── MarioMain.mp3
│   └── MarioLose.mp3
└── vazir-font/

## 🔊 Sound Logic Highlights

- Uses a global isMuted flag for reliable audio control
- Music plays only when the game is active and unmuted
- Game-over sound triggers only if unmuted
- Clicking the mute/unmute button restores canvas focus to prevent input loss

## 📱 Mobile Support

- Swipe detection for intuitive movement
- Touch-optimized layout and controls
- Prevents accidental scrolling during gameplay

## 🧠 About Me

This game is created by amirqp3044 and this version was redesigned and developed by **Sepinood Langari**.
