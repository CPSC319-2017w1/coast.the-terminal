import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import TableRenderers from 'react-pivottable/TableRenderers';
import { isLoading, hasStoppedLoading } from '../../actions/main-actions';
import { viewAllContractorDataSeparateRows } from '../../actions/contractor-info-actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables,
    contractors: state.contractors
  };
};

const Plot = createPlotlyComponent(window.Plotly);

const mapDispatchToProps = dispatch => {
  return {
    getData: (token) => {
      dispatch(isLoading());
      dispatch(viewAllContractorDataSeparateRows(token));
    },
    stopLoading: () => {
      dispatch(hasStoppedLoading());
    }
  };
};

const data = [];

class ReportBuilderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pivotState: props };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pivotState: nextProps});
    if(nextProps.contractors.data.length > 0) {
      let contractorInfo = nextProps.contractors.data.filter((contractor) => {
        return contractor['Status'] === 'active';
      });
      contractorInfo = this.removeIdFromContractorsAndPopulateName(contractorInfo);
      /**
       * set data for table here
       */
     this.setState({
        mode: 'demo',
        filename: 'Contractor Data',
        pivotState: {
          data: contractorInfo,
          rendererName: 'Table',
          plotlyOptions: {width: 900, height: 500},
          aggregatorName: 'Sum', vals: ['Total Monthly Cost'],
          cols: [],
          rows: ['Reporting Manager Last Name', 'Agency Source', 'Contractor Name', 'Project Name', 'Skill Name', 'Pay Grade End Amount', 'Allowance Expense']
        }
      });
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getData(this.props.user.token);
  }

  componentWillMount() {
    this.setState({
      mode: "demo",
      filename: "Contractor Data",
      pivotState: {
        data: data,
        rendererName: "Table",
        plotlyOptions: {width: 900, height: 500}
      }
    });
  }

  removeIdFromContractorsAndPopulateName(contractorData) {
    if (!Array.isArray(contractorData)) {
      contractorData = contractorData.humanReadableData;
    }
    for (let contractor of contractorData) {
      delete contractor['id'];
      contractor['Contractor Name'] = contractor['First Name'] + ' ' + contractor['Last Name'];
      delete contractor['First Name'];
      delete contractor['Last Name'];
    }

    return contractorData;
  }


  render() {
    return <PivotTableUI
      data={data} onChange={s => this.setState({pivotState: s})}
      renderers={Object.assign({}, TableRenderers, createPlotlyRenderers(Plot))}
      {...this.state.pivotState} unusedOrientationCutoff={Infinity}
    />;
  }
}

ReportBuilderContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  contractors: PropTypes.object.isRequired
};

const TableBuilder = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportBuilderContainer);

export default TableBuilder;