import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import styled from 'styled-components';

import { Container, Form, Button } from '../../themes/basic';

const Login = () => {
  
  const isAuth = useSelector(state=>state.auth.isAuthenticated);
  
  if(isAuth){
    window.location.href = "/dashboard";
  }

  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);


  const email = useRef();
  const password = useRef();

  console.log('login component render...');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email: email.current.value, password: password.current.value }));
  }
  return(
    <LoginBoxStyled className='login-box'>
      <Container>
        <h1 className='title'>Zaloguj się</h1>
        <p className='subtitle'>Zaloguj się do panelu</p>  
        <Form onSubmit={onSubmitHandler}>
            <div className='form-group'>
                <input type='text' name='email' placeholder='Adres email' ref={email}/>
                <span className='error-message'>{ errors.email && errors.email}</span>
            </div>
            <div className='form-group'>
                <input type='text' name='password' placeholder='Hasło' ref={password}/>
                <span className='error-message'>{ errors.password && errors.password}</span>
            </div>
            <Button>Zaloguj się</Button>
        </Form>
      </Container>
    </LoginBoxStyled>
    
  )
}

export default Login;

const LoginBoxStyled = styled.div`
    .title,
    .subtitle{
        display:flex;
        justify-content:center; 
    }
    input{
      width:350px;
    }
`;


// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//       errors: {}
//     };

//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentDidMount() {
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }
//   onSubmit(e) {
//     e.preventDefault();
//     const userData = {
//       email: this.state.email,
//       password: this.state.password
//     };

//     this.props.loginUser(userData);
//   }
//   onChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }
//   render() {
//     const { errors } = this.state;
//     return (
//       <div className='login'>
//         <div className='container'>
//           <div className='row'>
//             <div className='col-md-8 m-auto'>
//               <h1 className='display-4 text-center'>Zaloguj się</h1>
//               <p className='lead text-center'>
//                 Zaloguj się do footballmanagera
//               </p>
//               <form onSubmit={this.onSubmit}>
//                 <TextFieldGroup
//                   placeholder='Adres email'
//                   name='email'
//                   type='email'
//                   value={this.state.email}
//                   onChange={this.onChange}
//                   error={errors.email}
//                 />
//                 <TextFieldGroup
//                   placeholder='Hasło'
//                   name='password'
//                   type='password'
//                   value={this.state.password}
//                   onChange={this.onChange}
//                   error={errors.password}
//                 />
//                 <input type='submit' className='btn btn-info btn-block mt-4' />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { loginUser }
// )(Login);
