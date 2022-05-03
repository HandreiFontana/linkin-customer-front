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
}))

export { useStyles }