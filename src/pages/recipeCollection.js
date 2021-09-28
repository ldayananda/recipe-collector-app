import React from "react"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import RecipeNameComponent from "../components/recipeNameComponent";
import StepComponent from "../components/stepComponent";
import { RECIPE_DB_URL } from '../settings'

class RecipeCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = { recipeName: '', recipeId: null, stepIds: [] };

        this.postRecipe = this.postRecipe.bind(this)
        this.postStep = this.postStep.bind(this)
    }

    postRecipe(recipeName) {
        fetch(RECIPE_DB_URL + "/recipes", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "name": recipeName })
        })
            .then(response => response.json())
            .then(data => this.setState({ "recipeId": data.id, "recipeName": data.name }));
    }

    postStep(v) {
        let val = { "time": v.time, "instruction": v.instruction, "recipeId": this.state.recipeId }

        fetch(RECIPE_DB_URL + "/recipes/" + this.state.recipeId + "/steps", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(val)
        })
            .then(response => response.json())
            .then(data => {
                let newVal = Object.assign([], this.state.stepIds)
                newVal.push(data.id)
                this.setState({ "stepIds": newVal })
            });

    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
                        <RecipeNameComponent onAdd={this.postRecipe} disabled={this.state.recipeId != null} />
                        {
                            this.state.recipeId &&
                            <StepComponent onAdd={this.postStep} disabled={this.state.time != null} />
                        }
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }
}

export default RecipeCollection