import React from "react"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import RecipeNameComponent from "../components/recipeNameComponent";
import StepComponent from "../components/stepComponent";
import IngredientComponent from "../components/ingredientComponent";
import { RECIPE_DB_URL } from '../settings'

class RecipeCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeName: '', recipeId: null, stepIds: {}, disabledComponents: {
                recipeName: false,
                steps: true,
                ingredients: true
            }
        };

        this.postRecipe = this.postRecipe.bind(this)
        this.postStep = this.postStep.bind(this)
        this.postIngredient = this.postIngredient.bind(this)
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
            .then(data => {
                let newDisabled = Object.assign(
                    {},
                    this.state.disabledComponents,
                    { "recipeName": true, "steps": false }
                )
                this.setState({
                    "recipeId": data.id,
                    "recipeName": data.name,
                    "disabledComponents": newDisabled
                })
            });
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
                let newDisabled = Object.assign(
                    {},
                    this.state.disabledComponents,
                    { "steps": true, "ingredients": false }
                )
                let newVal = Object.assign({}, this.state.stepIds)
                let stepId = data.id
                newVal[stepId] = { "ingredients": {} }
                this.setState({ "stepIds": newVal, "disabledComponents": newDisabled })
            });

    }

    postIngredient(v) {
        let stepIds = Object.keys(this.state.stepIds)
        let lastStepId = stepIds[stepIds.length - 1]
        let val = {
            "name": v.name,
            "quantity": parseInt(v.quantity),
            "unit": v.unit,
            "qualifier": v.qualifier,
            "stepId": parseInt(lastStepId)
        }

        fetch(RECIPE_DB_URL + "/steps/" + val.stepId + "/ingredients", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(val)
        })
            .then(response => response.json())
            .then(data => {
                let stepId = data.stepId
                let ingredientId = data.id


                let newDisabled = Object.assign(
                    {},
                    this.state.disabledComponents,
                    { "ingredients": true }
                )
                let newStepIds = Object.assign({}, this.state.stepIds)
                let newVal = newStepIds[stepId].ingredients
                newVal[ingredientId] = { "alternatives": [] }
                this.setState({ "stepIds": newStepIds, "disabledComponents": newDisabled })
            });

    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
                        <RecipeNameComponent onAdd={this.postRecipe} disabled={this.state.disabledComponents.recipeName} />
                        {
                            this.state.recipeId &&
                            <StepComponent onAdd={this.postStep} disabled={this.state.disabledComponents.steps} />
                        }
                        {
                            !this.state.disabledComponents.ingredients &&
                            <IngredientComponent onAdd={this.postIngredient} disabled={this.state.disabledComponents.ingredients} />
                        }
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }
}

export default RecipeCollection