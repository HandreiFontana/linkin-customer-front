import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        maxWidth: "1120px",
        padding: "20px 30px",
    },
    containerTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "bold",
        color: theme.palette.primary.dark,
    },
    buttonNewLinkContainer: {
        display: "flex",
        justifyContent: "right"
    },
    buttonNewLink: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        fontWeight: "bold",
        borderRadius: "30px",
        height: "3rem",
        minWidth: "150px"
    },
    category: {
        maxWidth: "100%",
        padding: "10px 0px"
    },
    categoryName: {
        marginBottom: "10px",
        color: theme.palette.primary.main,
        borderBottom: "1px solid",
        borderColor: theme.palette.primary.main,
        fontWeight: "bold"
    },
    link: {
        padding: "10px 0px 0px 0px"
    },
    button: {
        width: "100%",
        color: theme.palette.primary.main,
        background: theme.palette.secondary.light,
    },
    description: {
        color: theme.palette.primary.dark,
    },
    trashBin: {
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "right",
    }
}))

export { useStyles }