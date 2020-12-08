import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: 'salmon',
    color: 'black',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
export default HtmlTooltip;
