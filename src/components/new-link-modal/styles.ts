import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    buttonNewLink: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        fontWeight: "bold",
        borderRadius: "30px",
        height: "3rem",
        minWidth: "150px"
    },
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        background: theme.palette.background.default,
        borderRadius: '15px',
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        boxShadow: '24px',
        padding: '4px'
    },
    paper: {
        margin: '20px',
    },
    messages: {
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    lastInputs: {
        marginTop: '-5px'
    },
    checkbox: {
        marginRight: "0px",
        color: theme.palette.primary.main,
    },
    privado: {
        color: theme.palette.primary.main,
    }
}))

export { useStyles }