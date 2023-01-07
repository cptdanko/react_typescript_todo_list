import styled from "@emotion/styled";
import { Card, useMediaQuery, useTheme } from "@mui/material";

export const CustomCard = styled(Card)`
  min-width: 300px;
  width: 500px;
  height: 500px;
`;

export const CustomCardMd = styled(Card)`
  min-width: 300px;
  width: 390px;
`;

export default function MyCustomHomeCard() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    if(matches) {
        return <CustomCard />;
    } else {
        return <CustomCardMd />;
    }
  
  }