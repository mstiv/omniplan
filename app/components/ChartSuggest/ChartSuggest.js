import React from 'react';
import {Typeahead} from 'react-typeahead';
import PlanActions from 'actions/PlanActions';
import SettingsActions from 'actions/SettingsActions';
import ChartSuggestStyles from './ChartSuggest.css';

class ChartSuggest extends React.Component {
    constructor(...args) {
        super(args);
    }

    componentDidMount() {
    	document.getElementsByClassName(ChartSuggestStyles.Input)[0].focus();
    }

	reset() {
		PlanActions.resetFilters();
		SettingsActions.resetSetting('openedTasks');
		this.refs.typeahead.setEntryText('');
	}

    render() {
    	let options = getOptionsFromPlan(this.props.plan);

      	return (
      		<div className={ChartSuggestStyles.Container}>
      			<div className={ChartSuggestStyles.Wrapper}>
      				<div className={ChartSuggestStyles.Suggest}>
      					<Typeahead
      						placeholder = 'Start entering resource name'
      						options = {options}
      						maxVisible = {10}
      						customClasses = {{
      							input: ChartSuggestStyles.Input,
      							hover: ChartSuggestStyles.OptionHovered,
      							listItem: ChartSuggestStyles.Option,
      							listAnchor: ChartSuggestStyles.OptionContent
      						}}
      						filterOption = {filterOption}
      						displayOption = {displayOption}
      						onOptionSelected = {applyFilter}
      						ref = 'typeahead'
      					/>
      				</div>
      			</div>
  				<div className={ChartSuggestStyles.ResetButton} onClick={this.reset.bind(this)}>Reset</div>
      		</div>
  		);
    }
}


function getOptionsFromPlan(plan) {
	return plan && plan.resources ? plan.resources.filter(r => r.name) : [];
}

function filterOption(inputValue, resource) {
	return resource.name.indexOf(inputValue) >= 0;
}

function displayOption(resource) {
	return resource.name;
}

function applyFilter(resource) {
	PlanActions.resetFilters();
	PlanActions.applyFilter({name: 'resourceId', value: resource.id});
}

export default ChartSuggest;
