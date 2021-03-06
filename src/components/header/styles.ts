import { createStyles, Theme, makeStyles, alpha } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            height: '5rem',
        },
        container: {
            maxWidth: '1120px',
            height: '100%',
        },
        grids: {
            height: '100%',
        },
        grid: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        logo: {
            width: '160px',
        },
        button: {
            height: '3rem',
            borderRadius: '3rem',
            padding: '0 1.5rem',
            backgroundColor: theme.palette.secondary.main,
            '&:hover': {
                backgroundColor: alpha(theme.palette.secondary.main, 0.8),
            },
            color: theme.palette.primary.dark,
            fontWeight: 'bold',
            boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.37)',
        },
        loginIcon: {
            marginRight: theme.spacing(2),
            color: theme.palette.primary.dark,
        },
    })
)

export { useStyles }