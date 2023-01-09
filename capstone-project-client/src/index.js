import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'
import reducer from './store/reducer';
import LoginS from './components/LoginS';
import RegisterS from './components/RegisterS';
import TeacherPost from './components/TeacherPost';
import Baselayout from './components/Baselayout';
import 'bootstrap/dist/css/bootstrap.min.css'
import ProtectedRoute from './components/ProtectedRoute';
import Signout from './components/Signout';
import Quiz from './components/Quiz';
import QuizE from './components/QuizE';
import QuizM from './components/QuizM';
import QuizH from './components/QuizH';
import Home from './components/Home';
import Paginated from './components/Pagination';
import Pagination from './components/Pagination';
import TeacherCabinet from './components/TeacherCabinet';
import Teacher2 from './components/Teacher2';
import Update from './components/Update';
import HomePage from './components/HomePage';
import Student from './components/Student';



const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const token = localStorage.getItem('jwt')
if(token) {
  store.dispatch({type: 'ON_LOGIN', payload: token})
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store = {store}>
      <React.StrictMode>
      <BrowserRouter>
      <Baselayout >
      <Routes>
        <Route path='/' element= { <HomePage />} />
        <Route path = '/:id' element= { <App />} />
        <Route path = '/login' element= {<LoginS />} />
        <Route path = '/register' element= {<RegisterS />} />
        <Route path = '/teacher-post/:id' element ={<ProtectedRoute><TeacherPost/></ProtectedRoute>} />
        <Route path = '/signout' element = {<Signout/>} />
        <Route path = '/quiz' element = {<Quiz />} />
        <Route path = '/student' element = {<Student />} />
        <Route path = '/easyquiz' element = {<QuizE />} />
        <Route path = '/mediumquiz' element = {<QuizM />} />
        <Route path = '/hardquiz' element = {<QuizH />} />
        <Route path = '/Home' element = {<Home />} />
        <Route path='/Pagination' element = {<Pagination/>} />
        <Route path='/my-teacher-list/:id' element = {<TeacherCabinet/>} />
        <Route path = "/update/:id" element = {<Update/>} />
        {/* <Route path='/my-teacher-list/:id' element = {<Teacher2/>} /> */}
      </Routes>
      </Baselayout>
    </BrowserRouter>
    </React.StrictMode>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
