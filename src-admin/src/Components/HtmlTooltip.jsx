import { Tooltip } from "@mui/material";

function HtmlTooltip({ title, children, props }) {
    return (
       <Tooltip    
            // eslint-disable-next-line react/no-danger
            title={<div dangerouslySetInnerHTML={{ __html: title }} />}
            enterDelay={1000}
            placement="top-start"
            {...props}
        >
            {children}
        </Tooltip>
    );
}
export default HtmlTooltip;
