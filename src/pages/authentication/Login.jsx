import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom"
import { Col, Container, Row, Card } from "reactstrap"
import WebServiceRequest from "actions/request"; 
import { AuthLogin } from "actions/auth_helper"
import { useHistory } from "react-router-dom";
import { Toast, Toastify } from "components/toastify/toastify";


// import images
import bg from "../../assets/images/bg.jpg";
import logo from "../../assets/images/logo-tam.png";

const Login = () => {

  let history = useHistory();

  const [ loginForm, setLoginForm] = useState({"login_name": "", "password": ""})

  async function login() {
    let data = await WebServiceRequest(loginForm, "auth/login")
    if (data.S == "T") {
      AuthLogin(data)
      location.href = "/raporlar"
    }else {
      Toast("error", data.error_message)
    }
  }

  return (
    <React.Fragment>
      <Toastify/>
      <div className="account-pages">
        <MetaTags>
          <title>Giriş | Belha Global</title>
        </MetaTags>
 
          <div
            className="accountbg"
            style={{
              background: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          
          <div className="wrapper-page account-page-full">
            <Card className="shadow-none">
              <div className="card-block">
                <div className="account-box">
                  <div className="card-box shadow-none p-4">
                    <div className="p-2">
                      <div className="text-center mt-4">
                        <Link to="/">
                          <img src={logo} height="120" alt="logo" />
                        </Link>
                      </div>

                      <form className="mt-4" onSubmit={(e) => {login(); e.preventDefault();}}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="login_name">Kullanıcı Adı</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Kullanıcı Adınız"
                            value={loginForm.login_name}
                            required
                            onChange={ (e) => { setLoginForm({...loginForm, login_name: e.target.value}) } }
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="userpassword">Şifre</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Şifreniz"
                            value={loginForm.password}
                            required
                            onChange={ (e) => { setLoginForm({...loginForm, password: e.target.value}) } }
                          />
                        </div>

                        <Row className="mb-3">
                          <Col sm="12" className="text-center">
                            <button
                              className="btn btn-dark w-md waves-effect waves-light"
                              type="submit"
                            >
                              Giriş Yap
                          </button>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>


      </div>
    </React.Fragment>
  )
}

export default Login
