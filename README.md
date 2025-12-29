# MyStay – Hotel Booking System (Frontend)

MyStay is a modern hotel booking web application that allows guests to easily find and book hotel rooms, while enabling hotel managers to manage hotels, rooms, and bookings efficiently.  
This repository contains the **frontend implementation** of the system.

---

## 📌 Project Overview

**MyStay** solves two main problems:

- **Guests** can freely browse hotels, check room availability, and book rooms online.
- **Hotel Managers** can manage their hotels, rooms, prices, and bookings through a dedicated dashboard.

The application is built as part of a **Distributed Systems course project** and follows a **REST-based client–server architecture**.

---

## 👥 User Roles (Frontend Perspective)

- **Guest**

  - Browse hotels and rooms
  - View hotel details and locations on a map
  - Select check-in and check-out dates
  - Book and cancel rooms
  - Authenticate using Google OAuth

- **Manager**

  - Manage hotel profile
  - Add, update, and delete rooms
  - Set room prices and availability
  - View and manage bookings
  - View booking statistics

- **Admin**
  - Approves or rejects manager accounts  
    _(Admin logic is handled on the backend; frontend provides the interface)_

---

## ✨ Core Features (Implemented)

- Hotel and room listing
- Room filtering and availability checking
- Date selection with unavailable date handling
- Interactive maps using Leaflet
- Booking flow with simulated payment
- Role-based dashboards (Guest, Manager, Admin)
- Charts and statistics for managers
- Toast notifications and loading indicators
- Protected routes based on authentication and roles

---

## 🔐 Authentication & Authorization (Frontend)

- **Guests**

  - Google OAuth authentication

- **Managers & Admins**

  - JWT-based authentication (handled by backend)
  - Frontend stores and sends JWT for protected routes

- **Role-Based Access Control**
  - UI access is restricted based on user role (guest, manager, admin)

---

## 🛠️ Tech Stack (Frontend)

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Date Handling:** React Day Picker
- **Maps:** Leaflet
- **Charts:** Chart.js
- **Notifications:** React Hot Toast
- **Icons:** Hero Icons
- **Loading Indicators:** React Spinners

---

## 🌐 Backend Integration

- The frontend communicates with a **FastAPI backend** via **REST APIs**
- Data is exchanged using **JSON over HTTP**
- Backend responsibilities include:
  - Authentication & authorization
  - Booking validation (preventing overlapping bookings)
  - Data persistence

> ⚠️ Note: The backend is developed by a team member and is not part of this repository.

Backend Repo : https://github.com/Samuel-Tefera/mystay-backend

---

## 🧪 Booking & Data Synchronization

- Booking conflicts are **strictly enforced by the backend**
- Frontend synchronizes unavailable dates on refresh
- Temporary UI-level handling is used to reflect availability before refresh

---

## 🚧 Limitations

- Mobile responsiveness is possible but not fully optimized
- Payments are **simulated**, not integrated with real gateways

---

## 🔮 Future Enhancements

- AI-based hotel or room recommendations
- Real-time booking updates
- Full mobile responsiveness
- Migration from SQLite to Supabase
- Advanced analytics dashboard

---

## 👨‍💻 Team

- **Frontend Developer:** Kirubel Wondwossen
- **Backend Developer:** Team Partner

---

## 📚 Academic Context

- Course: **Distributed Systems**
- Architecture: **Client–Server**
- Communication: **REST-based Distributed System**

---

## 📄 License

This project was developed for educational purposes.
