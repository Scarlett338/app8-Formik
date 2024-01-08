// import * as yup from "yup";

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// // min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

// export const basicSchema = yup.object().shape({
//   // must be an object with this shape
//   email: yup.string().email("Please enter a vaild email").required("Required"),
//   age: yup.number().positive().integer().required("Required"),
//   name: yup.string().min(2).required("Required"),
//   password: yup
//     .string()
//     .min(8)
//     .matches(passwordRules, { message: "Please create a stronger password" })
//     .required("Required"),
//   /*   confirmPassword: yup
//         .string()
//         .oneOf([yup.ref("password")], "Passwords must match") // array of diff value
//         .required("Required"), */
// });

import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter valid email").required("Required"),
  age: yup.number().integer().positive().required("Required"),
  password: yup
    .string()
    .min(8)
    .matches(passwordRules, { message: "please create a stronger password" })
    .required("Required"),
  conPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export const advancedSchema = yup.object().shape({
  username: yup.string().min(5).required("Required"),
  jobType: yup
    .string()
    .oneOf(["designer", "developer", "manager", "other"], "oops")
    .required("Required"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service")
    .required("Required"),
});
