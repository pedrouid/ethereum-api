import * as React from "react";
import styled from "styled-components";
// import Button from "./components/Button";
import Column from "./components/Column";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Banner from "./components/Banner";
import AccountAssets from "./components/AccountAssets";
import { apiGetAccountAssets } from "./helpers/api";
import { IAssetData } from "./helpers/types";
import Input from "./components/Input";

const SLayout = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  text-align: center;
`;

const SContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SBalances = styled(Column)`
  height: 600px;
  height: 100%;
  & h3 {
    padding-top: 30px;
  }
`;

// const SButtonContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
// `;

// const SButton = styled(Button)`
//   border-radius: 8px;
//   font-size: ${fonts.size.medium};
//   height: 44px;
//   width: 100%;
//   max-width: 175px;
//   margin: 12px;
// `;

interface IAppState {
  fetching: boolean;
  chainId: number;
  address: string;
  assets: IAssetData[];
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  chainId: 1,
  address: "",
  assets: []
};

class App extends React.Component<any, any> {
  public state: IAppState = {
    ...INITIAL_STATE
  };

  public resetApp = async () => {
    await this.setState({ ...INITIAL_STATE });
  };

  public getAccountAssets = async () => {
    const { address, chainId } = this.state;
    this.setState({ fetching: true });
    try {
      const assets = await apiGetAccountAssets(address, chainId);

      await this.setState({ fetching: false, address, assets });
    } catch (error) {
      console.error(error); // tslint:disable-line
      await this.setState({ fetching: false });
    }
  };

  public render = () => {
    const { fetching, address, chainId, assets } = this.state;
    return (
      <SLayout>
        <Column maxWidth={1000} spanHeight>
          <Header address={address} chainId={chainId} />
          <SContent>
            <SBalances>
              <Banner />
              <h6>{`Insert Address`}</h6>
              <Input
                onChange={(e: any) =>
                  this.setState({ address: e.target.value })
                }
              />
              <h3>Balances</h3>
              {!fetching ? (
                <AccountAssets chainId={chainId} assets={assets} />
              ) : (
                <Column center>
                  <SContainer>
                    <Loader />
                  </SContainer>
                </Column>
              )}
            </SBalances>
          </SContent>
        </Column>
      </SLayout>
    );
  };
}

export default App;
