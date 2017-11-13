/*
REFERENCE DOWNLOADED FROM CODEPEN TO UNDERSTAND MECHANISM FOR SCROLLING FEATURE. DO NOT DELETE, I WILL DELETE WHEN I FINISH
THANKS XX
 */



import React from 'react';
import * as ReactDOM from 'react-dom';

class FixedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items,
      sortingProp: 'id',
      sortingDirectionAsc: true
    };

    this.scrollSidebar = this.scrollSidebar.bind(this);
    this.scrollBodyListHeader = this.scrollBodyListHeader.bind(this);
  }

  componentDidMount() {
    var $fixedTableBodyList = ReactDOM.findDOMNode(this.refs.fixedTableBodyList);

    Ps.initialize($fixedTableBodyList);

    $fixedTableBodyList.addEventListener('ps-scroll-y', this.scrollSidebar);
    $fixedTableBodyList.addEventListener('ps-y-reach-start', () => this.scrollSidebar({target: { scrollTop: 0 }}));
    $fixedTableBodyList.addEventListener('ps-scroll-x', this.scrollBodyListHeader);
    $fixedTableBodyList.addEventListener('ps-x-reach-start', () => this.scrollBodyListHeader({target: { scrollLeft: 0 }}));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      sortingProp: 'id',
      sortingDirectionAsc: true
    });
  }

  scrollSidebar(event) {
    React.findDOMNode(this.refs.sidebarList).style.top = `${-event.target.scrollTop}px`;
  }

  scrollBodyListHeader(event) {
    React.findDOMNode(this.refs.bodyListHeader).style.left = `${-event.target.scrollLeft}px`;
  }

  sortAsc(prop) {
    return this.state.items.sort((a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      }

      if (a[prop] < b[prop]) {
        return -1;
      }

      return 0;
    });
  }

  sortDesc(prop) {
    return this.state.items.sort((a, b) => {
      if (a[prop] < b[prop]) {
        return 1;
      }

      if (a[prop] > b[prop]) {
        return -1;
      }

      return 0;
    });
  }

  sortBy(prop) {
    if (prop === this.state.sortingProp) {
      if (this.state.sortingDirectionAsc) {
        this.setState({
          sortingDirectionAsc: false,
          items: this.sortDesc(prop)
        });
        return;
      } else {
        this.setState({
          sortingDirectionAsc: true,
          items: this.sortAsc(prop)
        });
        return;
      }
    }
    this.setState({
      sortingProp: prop,
      sortingDirectionAsc: true,
      items: this.sortAsc(prop)
    });
  }

  renderFixedList() {
    var items = this.state.items.map((i) => {
      return (
        <div className="fixed-table__row">
          <div className="fixed-table__col">{i.id}</div>
        </div>
      );
    });

    return (
      <div ref="sidebarList"
        className="fixed-table__list fixed-table__list--fixed">
        {items}
      </div>
    );
  }

  renderList() {
    var items = this.state.items.map((i, index) => {
      return (
        <div key={`details-row-${index}`}
          className="fixed-table__row">
          <div className="fixed-table__col">{i.first_name}</div>
          <div className="fixed-table__col">{i.last_name}</div>
          <div className="fixed-table__col">{i.email}</div>
          <div className="fixed-table__col">{i.country}</div>
          <div className="fixed-table__col">{i.ip_address}</div>
        </div>
      );
    });
    return (
      <div ref="fixedTableBodyList"
        onScroll="onBodyListScroll"
        className="fixed-table__list">
        {items}
      </div>
    );
  }
  render() {
    return (
      <div className="fixed-table">
        <div className="fixed-table__sidebar">
          <div className="fixed-table__header">
            <div className="fixed-table__th"
              onClick={this.sortBy.bind(this, 'id')}>Id</div>
          </div>
          <div className="fixed-table__scrollable-sidebar">
            {this.renderFixedList()}
          </div>
        </div>
        <div className="fixed-table__body">
          <div className="fixed-table__header">
            <div ref="bodyListHeader"
              className="fixed-table__scrollable-header">
              <div className="fixed-table__th"
                onClick={this.sortBy.bind(this, 'first_name')}>First Name</div>
              <div className="fixed-table__th"
                onClick={this.sortBy.bind(this, 'last_name')}>Last Name</div>
              <div className="fixed-table__th"
                onClick={this.sortBy.bind(this, 'email')}>Email</div>
              <div className="fixed-table__th"
                onClick={this.sortBy.bind(this, 'country')}>Country</div>
              <div className="fixed-table__th"
                onClick={this.sortBy.bind(this, 'ip_address')}>Ip Address</div>
            </div>
          </div>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

FixedTable.propTypes = {
  items: React.PropTypes.array.isRequired
};

React.render(
  <FixedTable items={items} /> ,
  document.querySelector('.container')
);/**
 * Created by shrey on 2017-11-07.
 */
