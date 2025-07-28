import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useForm } from "react-hook-form"

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting},
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d*1000)
    })
  }


  const onSubmit = async (data) => {
    // await delay(2) // Simulating a delay of 2 seconds
    let r = fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    r.then((res) => {
      if (res.status === 200) {
        alert("Login Success")
      } else {
        setError("myform", { type: "manual", message: "Invalid username or password" })
      }
    }).catch((err) => {
      console.error("Error:", err)
      setError("myform", { type: "manual", message: "An error occurred while processing your request" })
    })
    console.log(data)
    // Removed the extra parentheses here
    // data.username === "admin" && data.Password === "1234567" ? alert("Login Success") : setError("myform", { type: "manual", message: "Invalid username or password" })
  }

  return (
    <>
    {isSubmitting && <div className='loading'>Loading...</div>}
      <div className="container">
        <div className="Form">
          Login Form
          </div>
        <form action=""  onSubmit={handleSubmit(onSubmit)}>
          Name: <input placeholder='UserName' type="text"   {...register("username", {required:true , minLength: {value:3 , message: "min langth is 3"}, maxLength: {value:8 , message: "max langth is 8"}})} />
          {errors.username && <div className='red'>{errors.username.message}</div>}
          <br />
          <br />
          Password: <input placeholder='Password' type="Password"  {...register("Password", {required:true , minLength: {value:7 , message: "min langth of Password is 7"}, maxLength: {value:12 , message: "max langth of Password is 12"}})} />
          {errors.Password && <div className='red'>{errors.Password.message}</div>}
          <br />
          <br />
          <input disabled={isSubmitting} type="submit" name="submit" />
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
        </form>

      </div>
    </>
  )
}

export default App
