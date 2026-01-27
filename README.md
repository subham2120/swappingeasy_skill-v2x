# SwapIngeasy – Skill & Product Exchange Platform

SwapIngeasy is a full stack web application developed as an academic project.  
This project allows users to exchange skills and products with each other in a secure and structured way.

The main focus of this project is authentication, secure APIs, exchange workflow, and conditional messaging.

---

## Project Overview

The platform works in a simple flow:
- Users register and login
- Users add skills or products they want to exchange
- Other users send exchange requests
- Requests can be accepted or rejected
- Messaging is enabled only after request acceptance

This ensures controlled and meaningful user interaction.

---

## Key Features

- User Registration and Login  
- JWT based authentication  
- Public and private user profiles  
- Skill listing and product listing  
- Exchange request system  
- Accept / reject exchange requests  
- Messaging enabled only after approval  
- Secure backend APIs using Spring Security  
- Proper frontend–backend integration  

---

## Technologies Used

### Frontend
- React.js  
- JavaScript  
- CSS  
- Axios for API communication  

### Backend
- Java  
- Spring Boot  
- Spring Security  
- JWT Authentication  
- JPA / Hibernate  

### Database
- MySQL  

### Tools
- Git  
- GitHub  
- Maven  

---

## Project Architecture

- Frontend built using React for user interaction  
- Backend built using Spring Boot following layered architecture  
- REST APIs for communication  
- JWT for securing APIs  
- Database handled using JPA and Hibernate  

---

## Folder Structure

```txt
swappingeasy_skill-v2x/
│
├── backend/
│   └── swappingeasy/
│       ├── src/
│       │   └── main/
│       │       ├── java/
│       │       │   └── com/
│       │       │       └── swapingeasy/
│       │       │           ├── controller/      # REST APIs
│       │       │           ├── service/         # Business logic
│       │       │           ├── repository/      # Database access
│       │       │           ├── entity/           # Database entities
│       │       │           ├── dto/              # Request/Response DTOs
│       │       │           ├── config/           # Security & CORS config
│       │       │           └── SwappingeasyApplication.java
│       │       │
│       │       └── resources/
│       │           ├── application.properties   # App configuration
│       │           └── application.yml           # YAML configuration (optional)
│       │
│       └── pom.xml                               # Maven configuration
│
├── frontend/
│   └── swappingeasy-ui/
│       ├── public/                               # Static files
│       ├── src/
│       │   ├── components/                       # Reusable UI components
│       │   ├── pages/                            # Page-level components
│       │   ├── services/                         # API calls (Axios)
│       │   ├── App.js                            # Main App component
│       │   └── index.js                          # Entry point
│       │
│       └── package.json                          # Frontend dependencies
│
├── .gitignore                                    # Ignored files
└── README.md                                     # Project documentation
