import { ApolloClient, ApolloLink, concat, createHttpLink, gql,  InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../auth";

// const client = new GraphQLClient("http://localhost:9000/graphql", {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if(accessToken) {
//       return {"Authorization": `Bearer ${accessToken}`};
//     }
//     return {};
//   }
// });

const httpLink = createHttpLink({uri: "http://localhost:9000/graphql"});

const authLink = new ApolloLink((operation, forward) => {
  const accesToken = getAccessToken();
  if(accesToken) {
    operation.setContext({
      headers: {"Authorization": `Bearer ${accesToken}`},
    })

  }
  return forward(operation);
});
const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});


export async function getJob(id) {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        description
        title
        date
        company {
          id
          name
        }
      }
    }
  `;
  const { data } = await apolloClient.query({query, variables: { id }});
  return data.job;
}

export async function createJob({ title, description }) {
  const mutation = gql`
  mutation CreateJob($input: CreateJobInput!){
  job: createJob(input: $input) {
    id    
  }
}
  `
  
  const { data } = await apolloClient.mutate({
    mutation,
    variables: {input: {
      title,
      description
    }}
  });
  return data.job;
}

export async function getJobs() {
  const query = gql`
    query Jobs {
      jobs {
        id
        date
        title
        company {
          name
          id
        }
      }
    }
  `;
  const { data } = await apolloClient.query({query});
  return data.jobs;
}
export async function getCompanyById(id) {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const { data } = await apolloClient.query({query, variables: {id} });
  return data.company;
}
