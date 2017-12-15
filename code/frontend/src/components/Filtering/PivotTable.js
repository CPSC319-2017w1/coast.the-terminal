/**
 * Created by steph on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import '../Filtering/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import { isLoading, hasStoppedLoading } from '../../actions/main-actions';
import { viewReportData } from '../../actions/report-info-actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables,
    reportData: state.reportData
  };
};

const Plot = createPlotlyComponent(window.Plotly);

const mapDispatchToProps = dispatch => {
  return {
    getData: (token) => {
      dispatch(isLoading());
      dispatch(viewReportData(token));
    },
    stopLoading: () => {
      dispatch(hasStoppedLoading());
    }
  };
};

class PivotTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pivotState: props };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pivotState: nextProps});
    if(nextProps.reportData.data && nextProps.reportData.data.length > 0) {
      this.setState({pivotState: {
        data: nextProps.reportData.data
      }});
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getData(this.props.user.token);
  }

  componentWillMount() {
    this.setState({
      mode: 'demo',
      filename: 'Contractor Data',
      pivotState: {
        data: [],
        rendererName: 'Table',
        plotlyOptions: {width: 900, height: 500}
      }
    });
  }

  removeIdFromContractors(contractorData) {
    if (!Array.isArray(contractorData)) {
      contractorData = contractorData.humanReadableData;
    }
    for (let contractor of contractorData) {
      delete contractor['id'];
    }

    return contractorData;
  }

  /**
   * Renders the pivot table with the data you set in data={}
   * @return {XML}
   */
  render() {
    return <PivotTableUI
      data={this.state.pivotState.data} onChange={s => this.setState({pivotState: s})}
      renderers={Object.assign({}, TableRenderers, createPlotlyRenderers(Plot))}
      {...this.state.pivotState} unusedOrientationCutoff={Infinity}
    />;
  }
}

PivotTableContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired
};

const PivotTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(PivotTableContainer);

export default PivotTable;