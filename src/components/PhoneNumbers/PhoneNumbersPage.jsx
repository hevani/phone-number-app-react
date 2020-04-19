import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Input, Button, Form, Item, Segment } from 'semantic-ui-react';
import { selectTab, fetchPhonenumberList } from '../../actions/phoneNumberAction';
import ReactTable from '../../utils/ReactTable';

import { Alert} from 'react-bootstrap';


class PhoneNumbersPage extends Component {
  state = {
    error : '',
    filters: {
      phoneNumber: ''
    },

    error : "",
    page: 1,
    limit: 200,
    sortName: 'name',
    sortOrder: 'asc',
  };

  constructor(props) {
    super(props);
    this.reactTableRef = React.createRef();
  }

  componentWillMount() {
   
  }

  componentDidMount() {
    this.getData();
  }
  validateForm() {
    let formIsValid = true;
    if (!this.state.filters.phoneNumber
      || !this.state.filters.phoneNumber.match(/^\d{7}(?:\d{3})?$/)) { 
      this.setState({error : "Please enter only a 7 or 10 digit number"});
      formIsValid = false;
    }
    return formIsValid; 
  }

  handleClearError = () => {
    this.setState({error : ""});
  }
  handleFilterClick = () => {
     if(this.validateForm()) {
      this.setState(
        {
          page: 1,
          limit: 10,
          sortName: 'key',
          sortOrder: 'asc',
        },
        () => {
          this.getData();
        }
      );
     }
  };

  getData() {
    const { fetchPhonenumberList } = this.props;
    const { page, limit, filters, sortName, sortOrder } = this.state;
    let input = {
      filters,
      page,
      limit,
      sortName,
      sortOrder,
    };
    this.setState({ loading: true });

    fetchPhonenumberList(input)
      .then(() => {
        this.setState({ loading: false });
      })
  }
  builPhoneNumbersList() {
    const {
      phoneNumbersList: { data, page, total },
    } = this.props;


    const formatKey = (cell, row) => {
      if (row.key) {
        return <div>{'Key'}</div>;
      }
    };
    const columns = [
      {
        dataField: 'key',
        text: 'Combination'
      }
    ];
    const scrollToRef = () => {
      window.scrollTo(0, this.reactTableRef.current.offsetTop);
      this.reactTableRef.current.focus();
    };
    const onSizePerPageChange = (sizePerPage, page) => {
      this.setState(
        {
          page,
          limit: sizePerPage,
        },
        () => {
          this.getData();

          // Go to the top of the summary table
          scrollToRef();
        }
      );
    };

    const onPageChange = (page, sizePerPage) => {
      this.setState(
        {
          page,
          limit: sizePerPage,
        },
        () => {
          this.getData();

          // Go to the top of the summary table
          scrollToRef();
        }
      );
    };

    const onTableChange = (type, { sortField, sortOrder }) => {
      if (
        sortField === this.state.sortName &&
        sortOrder === this.state.sortOrder
      )
        return null;
      this.setState(
        {
          sortName: sortField || this.state.sortName,
          sortOrder: sortOrder || this.state.sortOrder,
        },
        () => this.getData()
      );
    };
    const defaultSorted = [
      {
        dataField: this.state.sortName,
        order: this.state.sortOrder,
      },
    ];

    return (
      <div ref={this.reactTableRef} tabIndex="-1">
        <ReactTable
          defaultSorted={defaultSorted}
          remote
          data={data}
          page={page}
          total={total}
          limit={this.state.limit}
          loading={this.state.loading}
          columns={columns}
          keyField="_id"
          onTableChange={onTableChange}
          onPageChange={onPageChange}
          onSizePerPageChange={onSizePerPageChange}
        />
      </div>
    );
  }

  handleChange = (e, { name, value }) =>
  this.setState({ filters: { ...this.state.filters, [name]: value } });

  showPhoneNumberSearch() {
    return (
        <Form>
              <label>Enter Phone#:</label>
              <Input
                name="phoneNumber"
                onChange={this.handleChange}
                onKeyDown={this.handleClearError.bind(this)}
                value={this.state.filters.phoneNumber}
                fluid
              />
              {this.state.error ? <div>{this.state.error}</div> : null}
            &nbsp;
            <Button
              width={2}
              label="&nbsp;"
              primary
              content={'Filter'}
              onClick={this.handleFilterClick.bind(this)}
              fluid
            />
        </Form>
    );
  }

  render() {
    return (
      <div>
        {this.showPhoneNumberSearch()}
        {this.builPhoneNumbersList()}
      </div>
    );
  }
}

PhoneNumbersPage.contextTypes = {

};

function mapStateToProps(state) {
  return {
    phoneNumbersList: state.phonenumber.phonenumbersList
  };
}

export default connect(mapStateToProps, {
  fetchPhonenumberList
})(PhoneNumbersPage);
