import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <>
      {/* Pills navs */}
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            id="tab-login"
            onClick={() => setActiveTab('login')}
            role="tab"
            aria-controls="pills-login"
            aria-selected={activeTab === 'login'}
          >
            Login
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'register' ? '' : ''}`}
            id="tab-register"
            onClick={() => setActiveTab('register')}
            role="tab"
            aria-controls="pills-register"
            aria-selected={activeTab === 'register'}
          >
            Register
          </button>
        </li>
      </ul>

      {/* Pills content */}
      <div className="tab-content">
        {activeTab === 'login' && (
          <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
            <form>
              <div className="text-center mb-3">
                <p>Sign in with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>

              <p className="text-center">or:</p>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" id="loginName" className="form-control" />
                <label className="form-label" htmlFor="loginName">Email or username</label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" className="form-control" />
                <label className="form-label" htmlFor="loginPassword">Password</label>
              </div>

              {/* 2 column grid layout */}
              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  {/* Checkbox */}
                  <div className="form-check mb-3 mb-md-0">
                    <input className="form-check-input" type="checkbox" id="loginCheck" defaultChecked />
                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                  {/* Simple link */}
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

              {/* Register buttons */}
              <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
            <form>
              <div className="text-center mb-3">
                <p>Sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>

              <p className="text-center">or:</p>

              {/* Name input */}
              <div className="form-outline mb-4">
                <input type="text" id="registerName" className="form-control" />
                <label className="form-label" htmlFor="registerName">Name</label>
              </div>

              {/* Username input */}
              <div className="form-outline mb-4">
                <input type="text" id="registerUsername" className="form-control" />
                <label className="form-label" htmlFor="registerUsername">Username</label>
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" id="registerEmail" className="form-control" />
                <label className="form-label" htmlFor="registerEmail">Email</label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="registerPassword" className="form-control" />
                <label className="form-label" htmlFor="registerPassword">Password</label>
              </div>

              {/* Repeat Password input */}
              <div className="form-outline mb-4">
                <input type="password" id="registerRepeatPassword" className="form-control" />
                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
              </div>

              {/* Checkbox */}
              <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" id="registerCheck" defaultChecked />
                <label className="form-check-label" htmlFor="registerCheck">I have read and agree to the terms</label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
