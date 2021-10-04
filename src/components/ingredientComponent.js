import * as React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

const SpacedFormComponent = styled('form')(({
    theme
}) => ({
    '& > *': {
        margin: theme.spacing(1),
    }
}));

class IngredientComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": "",
            "quantity": 0,
            "unit": "",
            "qualifier": ""
        };

        this.onIngredientSubmit = this.onIngredientSubmit.bind(this)
    }


    onIngredientSubmit(e) {
        e.preventDefault()
        this.props.onAdd(this.state)
    }

    render() {
        return (
            <SpacedFormComponent onSubmit={this.onIngredientSubmit}>
                <TextField
                    sx={{ padding: '2em' }}
                    id="name"
                    type="text"
                    label="ingredient"
                    value={this.state.name}
                    fullWidth
                    onInput={e => this.setState({ 'name': e.target.value })}
                />
                <TextField
                    sx={{ padding: '2em' }}
                    id="quantity"
                    type="text"
                    label="quantity"
                    value={this.state.quantity}
                    fullWidth
                    onInput={e => this.setState({ 'quantity': e.target.value })}
                />
                <TextField
                    sx={{ padding: '2em' }}
                    id="unit"
                    type="text"
                    label="unit"
                    value={this.state.unit}
                    fullWidth
                    onInput={e => this.setState({ 'unit': e.target.value })}
                />
                <TextField
                    sx={{ padding: '2em' }}
                    id="qualifier"
                    type="text"
                    label="qualifier"
                    value={this.state.qualifier}
                    fullWidth
                    onInput={e => this.setState({ 'qualifier': e.target.value })}
                />
                <Fab color="primary" aria-label="add" type="submit" disabled={this.props.disabled}>
                    <AddIcon />
                </Fab>
            </SpacedFormComponent>
        )
    }
}

export default IngredientComponent