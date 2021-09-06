import React from "react"
import { Container, CssBaseline, Typography } from "@material-ui/core"
import RecipeNameComponent from "../components/recipeNameComponent";

class RecipeCollection extends React.Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="xl">
                    <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} >
                        <RecipeNameComponent />
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }
}

export default RecipeCollection