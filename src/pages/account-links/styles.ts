import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        maxWidth: "1120px",
        padding: "20px 30px",
    },
    category: {
        maxWidth: "100%",
        padding: "10px 0px"
    },
    categoryName: {
        marginBottom: "10px",
        color: theme.palette.primary.dark,
        borderBottom: "1px solid",
        borderColor: theme.palette.primary.dark,
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
    }
}))

export { useStyles }