import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { NavLink, useNavigate } from 'react-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db }  from './Firebase'
import { toast } from 'react-toastify'
import { setDoc, doc } from 'firebase/firestore'

const validationSchema = Yup.object({
    FirstName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    LastName: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Required")
})

function SignUp() {

    const navigate = useNavigate();

    const handleRegister = async (values, { setSubmitting }) => {
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db, "Users", user.uid), {
                    FirstName: values.FirstName,
                    LastName: values.LastName,
                    email: values.email,
                    createdAt: new Date(),
                })
            }
            toast.success('Registration successful!', {
                position: "top-center",
               
            });
            navigate('/login') ;
            
        } catch (error) {
            console.error("Error during registration:", error.message);
            if (error.code === 'auth/network-request-failed') {
                alert('Network error. Please check your internet connection.');
            } else {
                toast.error(error.message, {
                    position: "bottom-center",
                });
            }
        } finally {
            setSubmitting(false);
        }
    }

  return (
    <Formik
        initialValues={{
            FirstName: '',
            LastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
    >
        <Form>
            <div className='flex flex-col gap-4 p-4 justify-center w-[80%] md:w-[60%] lg:w-[40%] m-auto my-[30%] lg:my-[10%] rounded-md bg-[rgb(186,224,255)] '>
                <h1 className='text-2xl font-bold text-center text-blue-700'>CREATE NEW ACCOUNT</h1>
                <div>
                    <label htmlFor="FirstName" className='font-semibold  text-[1.2rem] '>First Name</label><br />
                    <Field type="text" id="FirstName" name="FirstName" placeholder="First Name" className="w-[100%] p-2 rounded-md outline-none font-light mt-2" />
                    <ErrorMessage name="FirstName"  component="div" className='text-red-600 font-bold text-[1rem] mt-2'/>
                </div>

                <div>
                    <label htmlFor="LastName" className='font-semibold  text-[1.2rem] '>Last Name</label><br />
                    <Field type="text" id="LastName" name="LastName" placeholder="Last Name" className="w-[100%] p-2 rounded-md outline-none font-light mt-2" />
                    <ErrorMessage name="LastName"  component="div" className='text-red-600 font-bold text-[1rem] mt-2' />
                </div>

                <div>
                    <label htmlFor="email" className='font-semibold  text-[1.2rem] '>Email</label><br />
                    <Field type="email" id="email" name="email" placeholder="example@gmail.com" className="w-[100%] p-2 rounded-md outline-none font-light mt-2" />
                    <ErrorMessage name="email"  component="div" className='text-red-600 font-bold text-[1rem] mt-2' />
                </div>

                <div>
                    <label htmlFor="password" className='font-semibold  text-[1.2rem] '>Password</label><br />
                    <Field type="password" id="password" name="password" className="w-[100%] p-2 rounded-md outline-none font-light mt-2"  />
                    <ErrorMessage name="password"  component="div" className='text-red-600 font-bold text-[1rem] mt-2' />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className='font-semibold  text-[1.2rem] '>Confirm Password</label><br />
                    <Field type="password" id="" name="confirmPassword" className="w-[100%] p-2 rounded-md outline-none font-light mt-2"  />
                    <ErrorMessage name="confirmPassword"  component="div" className='text-red-600 font-bold text-[1rem] mt-2' />
                </div>

                <button type="submit" className='w-[100%] p-2 rounded-md outline-none font-bold tracking-widest text-[1.2rem] mt-2 bg-blue-600 text-[#F5F5F5] hover:bg-blue-500'>Sign Up</button>

                <div className='flex justify-center'>
                    <NavLink to="/login" className="text-blue-500 ">Already have an account? Sign In</NavLink>
                </div>

            </div>
           
           
        </Form>
    </Formik>
  )
}

export default SignUp