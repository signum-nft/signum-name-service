import { Stamp } from "@/app/components/Layout/components/Header/components/Stamp";
import { useAppContext } from "@/app/hooks/useAppContext";
import { styled } from "@mui/material/styles";
import { AttentionSeeker } from "react-awesome-reveal";

const StickyBox = styled("div")`
  position: fixed;
  top: 1rem;
  text-align: center;
  width: 99vw;
`;

export const OverlayStamp = () => {
  const {
    Ledger: { IsTestnet },
  } = useAppContext();

  if (!IsTestnet) return null;

  return (
    <StickyBox>
      <AttentionSeeker effect="rubberBand" delay={1_250}>
        <Stamp label="Testnet" />
      </AttentionSeeker>
    </StickyBox>
  );
};
