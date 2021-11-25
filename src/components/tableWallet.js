import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import TableHeader from './tableHeader';
import { deleteExpenses } from '../actions/index';

class TableWallet extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { expenses, deleteById } = this.props;
    const filterExpense = expenses.filter((expense) => expense.id !== id);
    deleteById(filterExpense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table className="table table-dark">
          <TableHeader />
          <tbody>
            {expenses.map((result) => {
              const {
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              } = result;
              return (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                  <td>{(value * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <BsTrashFill
                      className="btn-file"
                      type="button"
                      onClick={ () => this.handleClick(id) }
                      data-testid="delete-btn"
                    />
                    <button
                      className="btn btn-sm btn-primary btntable"
                      type="button"
                      onClick={ () => this.handleClick(id) }
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

TableWallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

const mapDispatchToProps = (dispatch) => ({
  deleteById: (payload) => dispatch(deleteExpenses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TableWallet);
