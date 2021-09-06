import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from "@material-ui/core"
import React from 'react';
import { styled } from '@material-ui/core/styles'


const SpacedFormComponent = styled('form')(({
    theme
}) => ({
    '& > *': {
        margin: theme.spacing(1),
    }
}));

class RecipeNameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { recipeName: '' };
        this.postRecipeOnClick = this.postRecipeOnClick.bind(this);
    }

    postRecipeOnClick(e) {
        console.log("CLICKED", this.state.recipeName)
        e.preventDefault()
    }

    render() {
        return (
            <SpacedFormComponent onSubmit={this.postRecipeOnClick}>
                <TextField
                    id="recipe-name2"
                    type="text"
                    label="Recipe Name"
                    value={this.state.recipeName}
                    onInput={e => this.setState({ 'recipeName': e.target.value })}
                />
                <Fab color="primary" aria-label="add" type="submit">
                    <AddIcon />
                </Fab>
            </SpacedFormComponent>
        )
    }
}

export default RecipeNameComponent