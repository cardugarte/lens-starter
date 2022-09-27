// import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createClient } from "urql"


// const APIURLTEST = 'https://api-mumbai.lens.dev/'
const APIURL = 'https://api.lens.dev'

// export const apolloClient= new ApolloClient({
//   uri: APIURL,
//   cache: new InMemoryCache(),
// })

export const urqlClient = new createClient({
  url: APIURL
})

// export const Profile = import { createClient } from 'urql'

// const APIURL = "https://api.lens.dev"

// export const client = new createClient({
//   url: APIURL
// })



export const Profile = `
query Profile {
  profile(request: { profileId: "0x09" }) {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    isDefault
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    handle
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
      __typename
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            symbol
            name
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
        type
      }
      ... on RevertFollowModuleSettings {
        type
      }
    }
  }
}
`