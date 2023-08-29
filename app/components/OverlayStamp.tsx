import { Stamp } from "@/app/components/Layout/components/Header/components/Stamp";
import { useAppContext } from "@/app/hooks/useAppContext";
import { styled } from "@mui/material/styles";

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
      <Stamp label="Testnet" />
    </StickyBox>
  );
};
