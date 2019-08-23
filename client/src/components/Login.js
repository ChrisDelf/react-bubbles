import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';
// import UserCard from './UserCard';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  media: {
    height: 200
  }
});
const LoginForm = ({ errors, touched, values, status }) => {

  const classes = useStyles();



  return (
    <>
      <div className="container2">
        <Card className={classes.card}>
          <h2>Login Page</h2>
          <Form className="formCon">
            <Field type="text" name="username" placeholder="username..." />
            {touched.username && errors.username && (
              <p className="error">{errors.username}</p>
            )}
            <Field type="password" name="password" placeholder="password.." />
            {touched.password && errors.password && (
              <p className="error">{errors.password}</p>
            )}

            <button className="button" type="submit">
              Create Account
            </button>

          </Form>
        </Card>
      </div>


    </>
  );
};


const FormikLoginForm = withFormik({
  mapPropsToValues({ username, password, history }) {
    return {
      username: username || '',
      password: password || '',
      history: history || ''
    };
  },


  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter a username'),
    password: Yup.string().required('Create a password')
  }),
  handleSubmit(values, { resetForm, setStatus }) {
    axios
      .post('http://localhost:5000/api/login', values)
      .then(res => {

        localStorage.setItem('token', res.data.payload)
        values.history.push("/BubblePage")

        resetForm();
      })

      .catch(err => console.log(err));
  }
})(LoginForm);

export default FormikLoginForm;
