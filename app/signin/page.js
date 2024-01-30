"use client"
import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/firebase';
import Link from 'next/link';

Link
const Signup = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const Signup = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                 
                const user = userCredential.user;
               
                alert('Signup Successfully')
                
             
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage)
            });
           
    }

    return (
        <>
            <div style={{height:'12%',width:'100%',backgroundColor:'black',display:'flex',alignItems:'center',justifyContent:'center',gap:'50px'}}>
                <img style={{height:'100%',width:'15%'}} src="https://images.squarespace-cdn.com/content/v1/566c552269a91af72b314d9c/1487647150282-3SCUC6X1TXR9QQQ3FZ6O/image-asset.jpeg?format=1500w" alt="" />
                <Link href='/signin' style={{textDecoration:'none',color:'white',fontSize:'1.5rem'}}>Create New Account</Link>
                <Link href='/login' style={{textDecoration:'none',color:'white',fontSize:'1.5rem'}}>Login</Link>
        </div>
       

        <div style={{backgroundColor:'#6C55F8',height:'100vh',width:'100vw'}}>
        <div className="container pt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Create Your Account</h1>
                            <form onSubmit={Signup}>
                                <div className="mb-3">
                                    <input type="email" className="form-control" required placeholder="Enter Your Email" ref={emailRef} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" required placeholder="Enter Your Password" ref={passwordRef} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    <Link style={{color:'white',textDecoration:'none'}}  href='/list'>SignUp </Link>
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )

    
};


export default Signup