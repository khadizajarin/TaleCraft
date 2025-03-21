"use client";
import background from "@/assets/image.png";
import { Almarai } from "next/font/google";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../lib/AuthProvider";
import API from "../../../utils/api";

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

const Page = () => {
  const { createUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSignup = async (values, { setSubmitting }) => {
    console.log("Form values:", values.email, values.password);

    const { data } = await API.post("/users", {
      name: values.name,
      email: values.email,
      password: values.password,
    });
    await createUser(values.email, values.password)
      .then(() => {
        router.push("/homepage");
        Swal.fire({
          title: "Good!",
          text: "Successfully signed up!",
          icon: "success",
          confirmButtonText: "Ok",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });
      })
      .catch((error) => {
        console.error("Signup error:", error);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={`${almarai.className} h-screen w-screen`}>
      <div
        className="bg-no-repeat bg-cover bg-center h-full w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${background.src})` }}
      >
        <div className={`${almarai.className}`}>
          <div className="w-[61rem] h-[32rem] flex">
            {/* Sign-up form */}
            <div className="bg-secondary w-[61rem] h-[32rem] flex flex-col">
              <div className="text-primary flex flex-col justify-start mb-6 lg:pt-16 lg:pl-[3.3rem]">
                <h1 className="text-2xl font-semibold">REGISTRATION</h1>
                <hr className="border-t-2 border-primary w-[15rem]"></hr>
              </div>

              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={handleSignup}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col justify-center items-center">
                    {/* Name */}
                    <div className="mb-4">
                      <label
                        className="block text-primary mb-1 text-sm"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <Field
                        className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary outline-none focus:ring-0 focus:border-transparent"
                        id="name"
                        name="name"
                        type="text"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-[10px] text-red-500 mt-2"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <label
                        className="block text-primary mb-1 text-sm"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary outline-none focus:ring-0 focus:border-transparent"
                        id="email"
                        name="email"
                        type="email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-[10px] text-red-500 mt-2"
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-8">
                      <label
                        className="block text-primary mb-1 text-sm"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <Field
                        className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary outline-none focus:ring-0 focus:border-transparent"
                        id="password"
                        name="password"
                        type="password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-[10px] text-red-500 mt-2"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                      <button
                        className="h-10 w-[8rem] bg-primary text-secondary py-2 font-bold focus:outline-none focus:shadow-outline disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing Up..." : "Sign Up"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <p className="text-center text-primary mt-4 text-sm tracking-wider">
                Already have an account?{" "}
                <a className="underline" href="/">
                  SIGN IN
                </a>
              </p>
            </div>

            {/* Title */}
            <div className="bg-primary w-[61rem] h-[32rem] flex flex-col items-end justify-end text-right lg:pr-16 lg:pb-16">
              <h1 className="text-secondary text-4xl font-bold">Create</h1>
              <h3 className="text-secondary text-2xl font-bold">New</h3>
              <h3 className="text-secondary text-2xl font-bold">Account</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
