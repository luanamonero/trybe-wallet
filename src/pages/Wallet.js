import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import { fecthCurrencies, addExpense } from '../actions/index';
import TableWallet from '../components/tableWallet';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const { id, currency, method, tag, description, value } = this.state;
    const { onSubmit } = this.props;

    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await api.json();

    this.setState((prevState) => ({ id: prevState.id + 1 }));
    onSubmit({ value, description, exchangeRates, id, currency, method, tag });
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  // eslint-disable-next-line max-lines-per-function
  renderForm() {
    const { currencies } = this.props;
    const { description, value, exchange, method, tag } = this.state;
    return (
      <form className="form-wallet">
        <div>
          <label htmlFor="value">
            Valor:
            <input
              className="form-wallet-2"
              id="value"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              className="form-wallet-1"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="exchange">
            Moeda:
            <select
              className="form-wallet-2"
              id="exchange"
              name="currency"
              value={ exchange }
              onChange={ this.handleChange }
            >
              {currencies.map((currency, index) => (
                <option key={ index }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              className="form-wallet-1"
              id="method"
              name="method"
              onChange={ this.handleChange }
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select id="tag" name="tag" value={ tag } onChange={ this.handleChange } className="form-wallet-1">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            className="btn btn-primary mb-2"
            type="submit"
            onClick={ this.handleClick }
            value="Adicionar Despesas"
          >
            Adicionar Despesas
          </button>
        </div>
      </form>
    );
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <Header email={ email } />
        <nav className="navbar navbar-dark bg-dark nav-color">
          { this.renderForm() }
        </nav>
        <TableWallet />
      </div>);
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fecthCurrencies()),
  onSubmit: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
