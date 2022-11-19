import {
  useContractMetadata,
  useActiveClaimCondition,
  useNFT,
  Web3Button,
  useContract,
} from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Theme.module.css";


// Put Your Edition Drop Contract address from the dashboard here
const myEditionDropContractAddress =
  "0x4a415D2F4bcC4a3023FBA6f98f0e40B5C3a17e09";

// Put your token ID here
const tokenId = 0;

const Home: NextPage = () => {
  const { contract: editionDrop } = useContract(myEditionDropContractAddress);

  // The amount the user claims, updates when they type a value into the input field.
  const [quantity, setQuantity] = useState<number>(1); // default to 1

  // Load contract metadata
  const { data: contractMetadata } = useContractMetadata(editionDrop);

  // Load the NFT metadata
  const { data: nftMetadata } = useNFT(editionDrop, tokenId);

  // Load the active claim condition
  const { data: activeClaimCondition } = useActiveClaimCondition(
    editionDrop,
    BigNumber.from(tokenId)
  );

  // Loading state while we fetch the metadata
  if (!editionDrop || !contractMetadata) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mintInfoContainer}>
        <div className={styles.infoSide}>
          <a href="https://heroesuprising.com" target="_blank" rel="noreferrer">
            <img
              src="/logohur.png"
              alt="Heroes Uprising Logo"
              width={250}
              className={styles.buttonGapTop}
            />
          </a>
          {/* Title of your NFT Collection */}
          <h1>Community Pass (HUVERSE)</h1>
          {/* Description of your NFT Collection */}
          <p className={styles.description}>
          A unique <b>non-fungible token</b> and <b>non-transferable</b> pass for Heroes Uprising community members to enter a special realm called <b>HUVERSE</b>.<br/><br/>
            <a href="https://docs.heroesuprising.com/game-economy-tokens-sale-and-funds-information/access-pass" target="_blank" rel="noreferrer" className={styles.link}>
              <b>Already have a community pass?</b>
            </a> 
          </p>
        </div>

        <div className={styles.imageSide}>
          {/* Image Preview of NFTs */}
          <img
            className={styles.image}
            src={nftMetadata?.metadata?.image || ""}
            alt={`${nftMetadata?.metadata?.name} preview image`}
          />

          {/* Amount claimed so far */}
          <div className={styles.mintCompletionArea}>
            <div className={styles.mintAreaLeft}>
              <p>Total Minted</p>
            </div>
            <div className={styles.mintAreaRight}>
              {activeClaimCondition ? (
                <p>
                  {/* Claimed supply so far */}
                  <b>{activeClaimCondition.currentMintSupply}</b>
                  {" / "}
                  {activeClaimCondition.maxClaimableSupply}
                </p>
              ) : (
                // Show loading state if we're still loading the supply
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Show claim button or connect wallet button */}
          <>
            <div className={styles.mintContainer}>
              <Web3Button
                contractAddress={myEditionDropContractAddress}
                action={async (contract) =>
                  await contract.erc1155.claim(tokenId, quantity)
                }
                // If the function is successful, we can do something here.
                onSuccess={(result) => alert("Congratulations, you claimed it already")}
                // If the function fails, we can do something here.
                onError={(error) => alert(error?.message)}
                accentColor="#16354e"
                colorMode="dark"
              >
                Claim
              </Web3Button>
              </div>
              <p className={styles.notice}>
                  You only need one access pass.<br/>
                  Not tradable and transferable. ⚠️
                </p>
                </>
        </div>
      </div>
      {/* Powered by thirdweb */}{" "}
      <div className={styles.partnerImageContainer}>
      <img
        src={`/logo.png`}
        alt="Thirdweb Logo"
        width={135}
        className={styles.buttonGapTop}
      />
      <img
        src={`/polygon.png`}
        alt="Polygon Logo"
        width={135}
        className={styles.buttonGapTop}
      />
      </div>
    </div>
  );
};

export default Home;
