import { alpha, makeStyles, Theme } from "@material-ui/core/styles";



const useStyles = makeStyles((theme: Theme) => ({
    container: {
        maxWidth: "1120px",
        marginTop: "100px",
    },
    hero: {
        height: "390px",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    strong: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
    button: {
        width: "260px",
        height: "4rem",
        borderRadius: "3rem",
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.8),
        },
        color: theme.palette.primary.dark,
        fontWeight: 'bold',
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.37)',
    },
    heroImage: {

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        borderRadius: "37px",
        border: "2px solid",
        borderColor: theme.palette.primary.main,
        height: '390px',
        width: "228px",
    },
}))

export { useStyles }