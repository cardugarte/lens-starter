import styles from "../styles/Home.module.css"
import { Tabs, Button } from "antd"
import { urqlClient, Profile } from "./api/lensCalls"
import { Moralis } from 'moralis'
import { EvmChain } from '@moralisweb3/evm-utils';


const { TabPane } = Tabs

export default function Home({ profile, nftArray }) {
  console.log(profile)
  let myNFT = ''

  async function follow(){

  }

  return (
    <div className={styles.container}>
      <img
        className={styles.banner}
        src={profile.coverPicture.original.url}
        alt="cover"
      />
      <div className={styles.profile}>
        <div className={styles.profileLeft}>
          <img
            className={styles.profileImg}
            src={ profile.picture.original.url }
            alt="profileImg"
          />
          <div className={styles.info}>
            <div className={styles.name}>{ profile.name }</div>
            <div className={styles.handle}>{ profile.handle }</div>
            <div className={styles.bio}>{ profile.bio }</div>
            <div className={styles.follow}>
              <div>Followers</div>
              <div>{ profile.stats.totalFollowers }</div>
            </div>
            <div className={styles.follow}>
              <div>Following</div>
              <div>{ profile.stats.totalFollowing }</div>
            </div>
          </div>
        </div>
        <div className={styles.profileRight}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="I'm Following" key="1">
            <div className={styles.followingNFTs}>
              {nftArray?.map((e) => {
                return (
                  <iframe
                    className={styles.animation}
                    src={e}
                  ></iframe>
                );
              })}
              </div>
            </TabPane>
            <TabPane tab="Follow Me" key="2">
              <div className={styles.followMe}>
                <div>
                <div className={styles.promptOne}>
                  Hey There 👋🏼
                </div>
                <div className={styles.promptTwo}>
                  Give me a follow and receive this cool NFT!
                </div>
                <Button onClick={follow} type="primary">Follow Me</Button>
                </div>
                {myNFT &&
                <iframe className={styles.myNFT} src={myNFT}></iframe>
                }
              </div>
            </TabPane>
            <TabPane tab="Social Posts" key="3" disabled={true} />
          </Tabs>
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  const response = await urqlClient.query( Profile ).toPromise()
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })
//   await Moralis.start({
//     apiKey: process.env.MORALIS_API_KEY,
// });
// await Moralis.start({
//   apiKey: "WcPLb6F4JPp1HGM4qumvcpwqFB9mzSIKtuoM8ysHcLokG7d58bJ98OVa6ttTW8bu"
// })
  const responseMoralis = await Moralis.EvmApi.nft.getWalletNFTs({
    address: response?.data.profile.ownedBy,
    chain: EvmChain.POLYGON,
});
console.log(responseMoralis);
nftArray = []

  myNFT = responseMoralis?.data.result
  for (let i = 0; i < nftArray.length; i++) {
    if(nftArray[i].metadata !== null) {
      if(
        'animation_url' in JSON.parse(myNFT[i].metadata) &&
        JSON.parse(myNFT[i].metadata).animation_url !== null &&
        JSON.parse(myNFT[i].metadata),animation_url.includes('.lens')) {
          nftArray.push(JSON.parse(myNFT[i].metadata).animation_url)
        }
    }
    
  }



  return {
    props: { profile: response?.data.profile, nftArray }
  }
}
