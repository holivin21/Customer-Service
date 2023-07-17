import { Link, Stack, Typography } from "@mui/material"
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
type TitleProps = {
    collapsed: boolean;
};

const AppLogo: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <Link href="/home" color="inherit" underline="none">
            {
                !collapsed ?
                    <Stack direction="row" alignItems="center" spacing={1}>

                        <MarkUnreadChatAltIcon color="primary" />
                        <Typography whiteSpace="nowrap">Customer Service</Typography>
                    </Stack> : <MarkUnreadChatAltIcon color="primary" />
            }
        </Link>
    )
}
export default AppLogo;