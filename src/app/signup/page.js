"use client"
import background from "@/assets/Blog-Site-01.png";
import { Almarai } from 'next/font/google'; // Import the font
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaFacebookF , FaGoogle} from "react-icons/fa6";

// Initialize the font
const almarai = Almarai({
  subsets: ['arabic'],
  weight: [ '300', '400','700','800']
});

const page = () => {
    return (
        <div className={`${almarai.className} h-screen w-screen `}>
        <div
          className="bg-no-repeat bg-cover bg-center h-full w-full flex justify-center items-center"
          style={{ backgroundImage: `url(${background.src})` }}
        >
           <div className={`${almarai.className}  `}>
            <div className="w-[60rem] h-[30rem] flex">
  
              {/* Login form */}
              <div className="bg-secondary w-[60rem] h-[30rem] flex flex-col justify-center items-center">
                
                <div className="text-primary flex gap-6  items-center mb-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-left">REGISTRATION</h1>
                    <hr className="border-t-2 border-primary w-[15rem]"></hr>
                  </div>
                  
                  <div className="flex gap-4 mb-4">
                    <button className="bg-primary text-secondary flex items-center justify-center text-xl w-10 h-10"><FaFacebookF /></button>
                    <button className="bg-primary text-secondary flex items-center justify-center text-xl w-10 h-10"><FaGoogle /></button>
                  </div>
                </div>
                
                 <Formik
                      initialValues={{ name:'',email: '', password: '', }}
                      validate={values => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = 'Required';
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                          errors.email = 'Invalid email address';
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          alert(JSON.stringify(values, null, 2));
                          setSubmitting(false);
                        }, 400);
                      }}
                    >
                    {({ isSubmitting }) => (
                    <Form>

                       {/* name */}
                       <div className="mb-4">
                        <label className="block text-primary mb-2" htmlFor="email">
                          Name
                        </label>
                        <Field
                          className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary "
                          id="name"
                          name="name"
                          type="name"
                        />
                        <ErrorMessage className="block text-[10px] mb-2 tracking-wider text-primary mt-2" name="name" component="div" />
                      </div>
  
                      {/* email */}
                        <div className="mb-4">
                        <label className="block text-primary mb-2" htmlFor="email">
                          Email
                        </label>
                        <Field
                          className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary "
                          id="email"
                          name="email"
                          type="email"
                        />
                        <ErrorMessage className="block text-[10px] mb-2 tracking-wider text-primary mt-2" name="email" component="div" />
                      </div>
  
                      {/* password */}
                      <div className="mb-4">
                        <label className="block text-primary mb-2" htmlFor="password">
                          Password
                        </label>
                        <Field
                        className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary "
                          id="password"
                          name="password"
                          type="password"
                          placeholder=""
                        />
                        <ErrorMessage className="block text-[10px] mb-2 tracking-wider text-primary mt-2" name="password" component="div" />
                      </div>
                      
                      {/* submit button */}
                      <div className="flex items-center justify-center">
                        <button
                          className="h-10 w-[8rem] bg-primary text-secondary py-2  font-bold focus:outline-none focus:shadow-outline"
                          type="submit" disabled={isSubmitting}
                        >
                          Sign Up
                        </button>
                      </div>
                            </Form>
                            )}
                    </Formik>
                <p className="text-center text-primary mt-4">Already have an account? <a className="" href="/">SIGN IN</a></p>
              </div>
  
              {/* Title */}
              <div className="bg-primary w-[60rem] h-[30rem] flex flex-col items-end justify-end text-right pr-16 pb-16">
                <h1 className="text-secondary text-4xl font-bold">Create</h1>
                <h3 className="text-secondary text-2xl font-bold">New Account</h3>
              </div>
            </div>
           </div>
        </div>
      </div>
    );
};

export default page;