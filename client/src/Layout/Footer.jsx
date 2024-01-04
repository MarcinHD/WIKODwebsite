import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        <Link color="inherit" href={`${process.env.REACT_APP_MAIN_PAGE_URL}`}>
          WIKOD
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Footer;