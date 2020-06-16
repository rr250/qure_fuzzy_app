import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchContacts } from '../../actions/contacts';

export class Search extends Component {
    state={
        search:''
    }
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        searchContacts: PropTypes.func.isRequired
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { search } = this.state;
        this.props.searchContacts(search);
        this.setState({
          search:''
        });
    };

    render(){

        return(
            <Fragment>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                        className="form-control"
                        type="text"
                        name="search"
                        placeholder="Search By Name And Place Enter"
                        onChange={this.onChange}
                        value={this.state.search}
                        />
                    </div>
                    <div className="form-group">
                </div>
                </form>
                {this.props.contacts.length>0 && 
                <Fragment>
                <h2>Search Results</h2>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                </Fragment>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    contacts: state.contacts.searchResults,
  });

export default connect(mapStateToProps,{searchContacts})(Search);