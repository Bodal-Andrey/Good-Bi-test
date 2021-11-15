import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { connect } from 'react-redux';
import { Operation } from './reducer.js';
import getGender from './selectors.js';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBackground: {
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 2),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    cardPage: {
        maxWidth: 500
    },

    formPage: {
        margin: theme.spacing(1),
    },

    formInput:{
        width: '100%'
    }
}));


const App = ({gender, loadName}) => {
console.log(gender)
    const classes = useStyles();

    const [inputValue, setInputValue] = useState();

    return (
        <div className={classes.appBackground}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Узнай пол по имени
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.drawerHeader}/>
                <Container>
                    <Card className={classes.cardPage}>
                        <form className={classes.formPage} noValidate autoComplete="off">
                            <CardContent>
                                <TextField onChange={(evt) => {
                                    setInputValue(evt.target.value);
                                }} className={classes.formInput} id="filled-basic" label="Введи свое транслитерированое имя (Латиницей)" variant="filled" />
                            </CardContent>
                            <CardActions>
                                <Button onClick={(evt) => {
                                    evt.preventDefault();
                                    loadName(inputValue);
                                }} variant="contained" color="primary">
                                    Узнать пол
                                </Button>
                            </CardActions>
                        </form>
                    </Card>
                </Container>
                <div className={classes.drawerHeader}/>
                <Container className={classes.root}>
                    {gender === `male` ?
                    <Card className={classes.cardPage}>
                        <CardContent>
                            <CardHeader title="Мужчина"/>
                        </CardContent>
                        </Card> :
                        gender === `female` ?
                        <Card className={classes.cardPage}>
                        <CardContent>
                            <CardHeader title="Женщина"/>
                        </CardContent>
                            </Card> :
                            ``
                    }
                </Container>

            </main>
        </div>
    );
}

const mapStateToProps = (state) => ({
    gender: getGender(state)
});

const mapDispatchToProps = (dispatch) => ({
    loadName(data) {
        dispatch(Operation.loadName(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
