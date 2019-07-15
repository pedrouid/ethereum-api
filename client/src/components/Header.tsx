import * as React from "react";
import styled from "styled-components";
import Blockie from "./Blockie";
import Banner from "./Banner";
import { ellipseAddress, getChainData } from "../helpers/utilities";
import { transitions } from "../styles";

const SHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`;

const SActiveChain = styled(SActiveAccount)`
  flex-direction: column;
  text-align: left;
  align-items: flex-start;
  & p {
    font-size: 0.8em;
    margin: 0;
    padding: 0;
  }
  & p:nth-child(2) {
    font-weight: bold;
  }
`;

const SBlockie = styled(Blockie)`
  margin-right: 10px;
`;

const SAddress = styled.p`
  transition: ${transitions.base};
  font-weight: bold;
  margin: 0;
`;

interface IHeaderProps {
  address: string;
  chainId: number;
}

const Header = (props: IHeaderProps) => {
  const { address, chainId } = props;
  const activeChain = chainId ? getChainData(chainId).name : null;
  return (
    <SHeader {...props}>
      {activeChain ? (
        <SActiveChain>
          <p>{`Selected`}</p>
          <p>{activeChain}</p>
        </SActiveChain>
      ) : (
        <Banner />
      )}
      {address && (
        <SActiveAccount>
          <SBlockie address={address} />
          <SAddress>{ellipseAddress(address)}</SAddress>
        </SActiveAccount>
      )}
    </SHeader>
  );
};

export default Header;
