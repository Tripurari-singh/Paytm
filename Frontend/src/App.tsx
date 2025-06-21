import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { DashBoard } from './pages/dashboard'
import { SendMoney } from './pages/sendMoney'
import PaymentDashboard from './pages/mainpage'


function App() {

  return (
    <>
   
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PaymentDashboard/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<DashBoard/>}></Route>
      <Route path='/sendmoney' element={<SendMoney/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
