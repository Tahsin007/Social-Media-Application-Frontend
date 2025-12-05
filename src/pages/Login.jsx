// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../index.css';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError, isLoginError, user } = useAuth();
  console.log("Token:", localStorage.getItem('accessToken'));
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isLoginError && loginError) {
      toast.error(loginError.response?.data?.message || 'Login failed');
    }
  }, [isLoginError, loginError]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // The useAuth hook handles navigation on success and errors.
    login(formData);
  };

  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <img src="/assets/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/assets/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/assets/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/assets/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <img src="/assets/images/login.png" alt="Image" className="_left_img" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <img src="/assets/images/logo.svg" alt="Image" className="_left_logo" />
                </div>
                <p className="_social_login_content_para _mar_b8">Welcome back</p>
                <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>
                <button type="button" className="_social_login_content_btn _mar_b40">
                  <img src="/assets/images/google.svg" alt="Image" className="_google_img" /> <span>Or sign-in with google</span>
                </button>
                <div className="_social_login_content_bottom_txt _mar_b40"> <span>Or</span></div>

                <form onSubmit={handleSubmit} className="_social_login_form">
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label htmlFor="email" className="_social_login_label _mar_b8">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control _social_login_input ${formErrors.email ? 'error' : ''}`}
                          disabled={isLoggingIn}
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="_social_login_form_input _mar_b14">
                        <label htmlFor="password" className="_social_login_label _mar_b8">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`form-control _social_login_input ${formErrors.password ? 'error' : ''}`}
                          disabled={isLoggingIn}
                        />
                        {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="_social_login_form_btn _mar_t40 _mar_b60">
                    <button type="submit" className="_social_login_form_btn_link _btn1" disabled={isLoggingIn}>
                      {isLoggingIn ? 'Signing in...' : 'Login now'}
                    </button>
                  </div>
                </form>
                <p className="_social_login_bottom_txt_para">Don't have an account? <Link to="/register">Create New Account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;