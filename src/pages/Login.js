import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionLogin } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validation());
  }

  validation() {
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const { email, password } = this.state;
    const nb = 6;
    const emailValid = (/[\w]+@[\w]+.com/.test(email));
    if (emailValid && password.length >= nb) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { login, history } = this.props;
    login({ email, password });
    this.setState({
      disabled: true,
    });
    history.push('/carteira');
  }

  renderInput() {
    const { email, password } = this.state;
    return (
      <>
        <label htmlFor="login-email">
          Email:
          <input
            className="form-control"
            id="login-email"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
            placeholder="Email"
          />
        </label>
        <label htmlFor="login-password">
          Senha:
          <input
            className="form-control"
            placeholder="Senha"
            data-testid="password-input"
            id="login-password"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
      </>
    );
  }

  renderForm() {
    const { disabled } = this.state;
    return (
      <div className="card2 card-container2">
        <img
          id="profile-img"
          className="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="imagem-profile"
        />
        <p id="profile-name" className="profile-name-card" />
        <form className="form-signin">
          { this.renderInput() }
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            value="Entrar"
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        { this.renderForm() }
        <Link to="/carteira">
          <div className="conf">
            <p>Configurações</p>
          </div>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actionLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
