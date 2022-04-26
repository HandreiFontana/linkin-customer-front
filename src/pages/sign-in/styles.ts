import { makeStyles } from '@material-ui/core/styles';

import signInBackgroundImg from '../../assets/logon.png'

const useStyles = makeStyles((theme) => ({
    messages: {
        height: '80px',
        minHeight: '80px',
        width: '100%',
        marginBottom: '-15px',
        marginTop: '-40px',
        flexDirection: 'row-reverse',
        justifyContent: 'left',
        textAlign: 'left',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: '25px',
        color: theme.palette.primary.main,
    },
    paper: {
        marginTop: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        backgroundImage: `url(${signInBackgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: '#fff',
        width: '800px',
        height: '532px',
        elevation: '24',
        boxShadow: '4',
    },
    form: {
        width: '270px', // Fix IE 11 issue.
        marginTop: '0',
        marginLeft: '30px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export { useStyles }
