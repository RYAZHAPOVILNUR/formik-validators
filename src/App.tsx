import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Formik} from 'formik';
import {compare, email, max, min, required} from './validators';
import {Validate} from './types';
import {getValidateFunction} from './utils';

const validate: Validate = getValidateFunction(
  {
    firstName: [required, min(2), max(20)],
    lastName: [required, min(2), max(20)],
    email: [required, email],
    password: [required, min(6), max(20)],
    confirmPassword: [required, min(6), max(20), compare('password')]
  }
)

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur
          }) =>
            (
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      helperText={errors.firstName && touched.firstName && errors.firstName}
                      error={!!errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      helperText={errors.lastName && touched.lastName && errors.lastName}
                      error={!!errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      helperText={errors.email && touched.email && errors.email}
                      error={!!errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      helperText={errors.password && touched.password && errors.password}
                      error={!!errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirm-password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                      error={!!errors.confirmPassword}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!!Object.keys(errors).length}
                >
                  Sign Up
                </Button>
              </form>
            )
          }
        </Formik>
      </div>
    </Container>
  );
}
