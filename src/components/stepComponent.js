import * as React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography'

const SpacedFormComponent = styled('form')(({
    theme
}) => ({
    '& > *': {
        margin: theme.spacing(1),
    }
}));

class StepComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { "time": { "mins": 5, "hours": 0 }, "instruction": "" };

        this.setTimeMinutes = this.setTimeMinutes.bind(this)
        this.setTimeHours = this.setTimeHours.bind(this)
        this.onStepSubmit = this.onStepSubmit.bind(this)
    }

    setTimeMinutes(e, v) {
        let currentVal = this.state.time
        let newVal = Object.assign({}, currentVal, { "mins": v })
        this.setState({ "time": newVal })
    }

    setTimeHours(e, v) {
        let currentVal = this.state.time
        let newVal = Object.assign({}, currentVal, { "hours": v })
        this.setState({ "time": newVal })
    }

    onStepSubmit(e) {
        e.preventDefault()
        this.props.onAdd(this.state)
    }

    render() {
        return (
            <SpacedFormComponent onSubmit={this.onStepSubmit}>
                <TextField
                    sx={{ padding: '2em' }}
                    id="instruction"
                    type="text"
                    label="instruction"
                    value={this.state.instruction}
                    fullWidth
                    onInput={e => this.setState({ 'instruction': e.target.value })}
                />
                <Box sx={{ margin: '10px 100px' }}>
                    <Typography gutterBottom>Minutes</Typography>
                    <Slider
                        aria-label="Minutes"
                        getAriaValueText={(value, index) => value}
                        value={this.state.time.mins}
                        valueLabelDisplay="on"
                        step={5}
                        marks
                        min={0}
                        max={60}
                        onChangeCommitted={this.setTimeMinutes}
                    />
                    <Typography gutterBottom>Hours</Typography>
                    <Slider
                        aria-label="Hours"
                        value={this.state.time.hours}
                        getAriaValueText={(value, index) => value}
                        valueLabelDisplay="on"
                        step={1}
                        marks
                        min={0}
                        max={24}
                        onChangeCommitted={this.setTimeHours}
                    />
                </Box>
                <Fab color="primary" aria-label="add" type="submit" disabled={this.props.disabled}>
                    <AddIcon />
                </Fab>
            </SpacedFormComponent>
        )
    }
}

export default StepComponent