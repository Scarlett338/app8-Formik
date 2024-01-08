// 分清 onChange != onSubmit

// learning

// yup | src > + schemas > index.js
// basicSchema
// onSubmit

// {errors} | console.log(errors)
// input - className={errors.email && touched.email ? "input-error" : ""} | touched - 填完晒先check
// {errors.email && touched.email && <p>{errors.email}</p>}

// isSubmitting | <button disabled={isSubmitting} type="submit">Submit</button>

// const onSubmit = async (values, actions) => {
//   console.log("submitted");
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm();
// };

// Advanced
// components > + CustomInput.js
// https://www.youtube.com/watch?v=7Ophfq0lEAY&ab_channel=NikitaDev  21:00
// 簡化 <Field >
// field- name, onBlur, onChange, value
// meta- touched, errors, value, initialValue
// helpers- function

// Advanced - Formik 例子

import { Field, useField, Form, Formik, useFormik } from "formik";
import React from "react";
import { advancedSchema, basicSchema } from "./schemas/index";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <div>
      <AdvancedForm />
      <BasicForm />
    </div>
  );
}

export default App;

const onSubmit2 = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 不包住 actions
  actions.resetForm();
}; // 在 AdvancedForm 外 define

const AdvancedForm = () => {
  return (
    <Formik
      initialValues={{ username: "", jobType: "", acceptedTos: false }}
      validationSchema={advancedSchema}
      onSubmit={onSubmit2}
    >
      {/*       {(props) => ( */}
      {({ isSubmitting }) => (
        <Form>
          {/* 方法二 */}
          <CustomInput
            label="Username"
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <CustomSelect
            label="Job Type"
            name="jobType"
            placeholder="Choose a Job"
          />
          <CustomerCheckbox name="acceptedTos" type="checkbox" />
          {/* 方法一 */}
          {/*  
          <Field type="text" name="username" placeholder="Name" />
          <br />    
          <Field as="select" /> 
           */}

          {/* 
          // name="左" 要同form state一樣 {{左:xxx}}  ) 
          // label 自訂
          // 不必 onChange, onBlur, value, name
          */}
          <div className="button">
            <button disabled={isSubmitting} type="submit">
              {/* if isSubmitting is true, disable button */}
              submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

function CustomInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <label>{label}</label>
      <br />
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
}

function CustomSelect({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <label>{label}</label>
      <br />
      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "select-error" : ""}
      >
        <option value="">Choose a Job</option>
        <option value="developer">developer</option>
        <option value="designer">designer</option>
        <option value="manager">product manager</option>
        <option value="other">other</option>
      </select>
      {meta.error && meta.touched && <div className="error">{meta.error}</div>}
    </>
  );
}

function CustomerCheckbox({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="checkbox">
        <input
          {...props}
          {...field}
          className={meta.touched && meta.error ? "input-error" : ""}
        />
        <span>I accept the terms of service</span>
      </div>
      {meta.error && meta.touched && <div className="error">{meta.error}</div>}
    </>
  );
}

//=================================================================
//=================================================================

// Basic - useFormik 例子

const onSubmit = async (values, actions) => {
  // mimic API
  console.log(values);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 唔明
  actions.resetForm();
};

function BasicForm() {
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isSubmitting,
  } = // 會用到的 formik內建野
    useFormik({
      // 會用到的 自訂variable: initVal, onSubmit,
      initialValues: {
        email: "",
        age: "",
        password: "",
        conPassword: "",
      },
      onSubmit,
      validationSchema: basicSchema,
    });
  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* 禁止自動填表 */}
        <div>
          <label htmlFor="email"></label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter email"
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          />
          {errors && touched && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="age"></label>
          <input
            type="number"
            value={values.age}
            onChange={handleChange}
            id="age"
            placeholder="Enter age"
            onBlur={handleBlur}
            className={errors.age ? "input-error" : ""}
          />
          {errors && touched && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter password"
            onBlur={handleBlur}
            className={errors.password ? "input-error" : ""}
          />
          {errors && touched && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="conPassword"></label>
          <input
            type="password"
            value={values.conPassword}
            onChange={handleChange}
            id="conPassword"
            placeholder="Enter confirm password"
            onBlur={handleBlur}
            className={errors.conPassword ? "input-error" : ""}
          />{" "}
          {errors && touched && <p className="error">{errors.conPassword}</p>}
        </div>
        <button disabled={isSubmitting} type="submit">
          submit
        </button>
        {/* 不會 frozen */}
      </form>
    </div>
  );
}
