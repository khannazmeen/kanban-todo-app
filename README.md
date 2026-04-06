# React Redux Kanban Todo App

A modern **Kanban-style Todo application** built with React and Redux Toolkit.
It allows users to manage tasks across different stages using **drag-and-drop functionality**.

---

##  Live Demo

🔗 https://your-live-link.vercel.app

---


## Features

* Fetch tasks from public API
* Create new tasks
* Edit existing tasks
* Delete tasks
* Drag & drop tasks between columns
* Reorder tasks within a column
* Centralized state management using Redux Toolkit
* Clean and responsive UI

---

## Tech Stack

* React JS
* Redux Toolkit
* @hello-pangea/dnd (Drag & Drop)
* Tailwind CSS / CSS

---

##  Project Structure

```
src/
│
├── components/
│   ├── Column.js
│   ├── TaskCard.js
│   └── AddTask.js
│
├── features/
│   └── tasks/
│       └── taskSlice.js
│
├── pages/
│   └── Board.js
│
├── api/
│   └── fetchTasks.js
│
├── app/
│   └── store.js
│
├── App.js
└── index.js
```

---

##  Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Navigate to project folder

```
cd your-repo-name

```

### 3. Install dependencies

```
npm install
```

### 4. Start the development server

```
npm start
```

---

## 🌐 API Used

```
https://jsonplaceholder.typicode.com/todos?_limit=5
```

Used to fetch initial task data.

---

## 🔄 Drag & Drop Implementation

Implemented using:

**@hello-pangea/dnd**

* Maintained alternative to react-beautiful-dnd
* Smooth drag-and-drop experience
* Supports reordering and cross-column movement

---

## Key Concepts

* Redux Store & Slice
* Actions and Reducers
* React Hooks (useState, useEffect, useDispatch, useSelector)
* Drag & Drop lifecycle (onDragEnd)
* Component-based architecture

---

##  Challenges Faced

* Managing drag-and-drop state updates
* Handling task movement between columns
* Fixing z-index issue during dragging
* Handling deprecated library warning

---

##  Future Improvements

* Backend integration
* User authentication
* Task priority & deadlines
* Pagination or infinite scroll
* UI/UX enhancements

---

## Author

**Nazmeen Khan**

---

##  If you like this project

Give it a ⭐ on GitHub!
