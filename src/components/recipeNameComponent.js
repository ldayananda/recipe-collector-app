import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from "@material-ui/core"
import React from 'react';
import { styled } from '@material-ui/core/styles'
import { RECIPE_DB_URL } from '../settings'

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
        e.preventDefault()

        console.log("CLICKED", this.state.recipeName)
        fetch(RECIPE_DB_URL + "/recipes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": this.state.recipeName })
        })
            .then(response => response.json())
            .then(data => console.log(data));

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