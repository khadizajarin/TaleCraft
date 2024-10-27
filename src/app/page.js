"use client";
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/compat/router"; 
import { AuthContext } from "@/firebase/AuthProvider";

// Initialize the font
const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800']
});

export default function Home() {
  const { signIn } = useContext(AuthContext); 
  const router = useRouter(); // Initialize router
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures component runs only in client-side
  }, []);

  const handleLogin = async (values, { setSubmitting }) => {
    console.log("forms value in login", values.email, values.password);

    if (!isClient) return; // Ensure router.push is only accessed in client-side


    signIn(values.email, values.password)
      .then(result => {
        // console.log(result.user);
        // Use router.push to navigate
        router.push(router.query.from || "/homepage");
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Invalid email or password!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
      .finally(() => setSubmitting(false));
  };

  if (!isClient) return null;

  return (
    <div className={`${almarai.className} h-screen w-screen`}>
      <div
        className="bg-no-repeat bg-cover bg-center h-full w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <div className={`${almarai.className}`}>
          <div className="w-[59rem] h-[28rem] flex">
            {/* Login form */}
            <div className="bg-secondary w-[59rem] h-[28rem] flex flex-col justify-center items-center">
              <div className="text-primary flex gap-6 justify-center items-center mb-4">
                <div>
                  <h1 className="text-xl font-semibold text-left">LOGIN</h1>
                  <hr className="border-t-2 border-primary w-[15rem]" />
                </div>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <button className="bg-primary text-secondary flex items-center justify-center text-xl w-10 h-10"><FaFacebookF /></button>
                  <button className="bg-primary text-secondary flex items-center justify-center text-xl w-10 h-10"><FaGoogle /></button>
                </div>
              </div>

              <Formik
                initialValues={{ email: '', password: '', toggle: false }}
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
                onSubmit={handleLogin}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* email */}
                    <div className="mb-4">
                      <label className="block text-primary mb-1 text-sm" htmlFor="email">
                        Email
                      </label>
                      <Field
                        className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary"
                        id="email"
                        name="email"
                        type="email"
                      />
                      <ErrorMessage className="block text-[10px] mb-2 tracking-wider text-primary mt-2" name="email" component="div" />
                    </div>

                    {/* password */}
                    <div className="mb-4">
                      <label className="block text-primary mb-1 text-sm" htmlFor="password">
                        Password
                      </label>
                      <Field
                        className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary"
                        id="password"
                        name="password"
                        type="password"
                        placeholder=""
                      />
                      <ErrorMessage className="block text-[10px] mb-2 tracking-wider text-primary mt-2" name="password" component="div" />
                    </div>

                    {/* check box */}
                    <div className="flex justify-start items-center mb-8">
                      <Field className="mr-2 checkbox-primary checkbox-xs rounded-none checkbox" type="checkbox" name="toggle" id="remember" />
                      <label className="text-primary text-sm" htmlFor="remember">Remember me</label>
                    </div>

                    {/* submit button */}
                    <div className="flex items-center justify-center">
                      <button
                        className="h-10 w-[8rem] bg-primary text-secondary py-2 font-bold focus:outline-none focus:shadow-outline"
                        type="submit" disabled={isSubmitting}
                      >
                        Sign In
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <p className="text-center text-primary mt-4 text-sm tracking-wide">Didn&apos;t have an account yet? <a className="" href="/signup">CREATE NEW ACCOUNT</a></p>
            </div>

            {/* Title */}
            <div className="bg-primary w-[59rem] h-[28rem] flex flex-col items-end justify-end text-right pr-16 pb-16">
              <h1 className="text-secondary text-4xl font-bold">TaleCraft</h1>
              <h3 className="text-secondary text-2xl font-bold">Where Pens Converge</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
