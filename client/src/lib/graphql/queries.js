import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("http://localhost:9000/graphql");

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
  const { job } = await client.request(query, { id });
  return job;
}

export async function createJob({ title, description }) {
  const mutation = gql`
  mutation CreateJob($input: CreateJobInput!){
  job: createJob(input: $input) {
    id    
  }
}
  `;
  const {job} = await client.request(mutation, {
    input: {
      title,
      description
    }
  });
  return job;
}

export async function getJobs() {
  const query = gql`
    query {
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
  const { jobs } = await client.request(query);
  return jobs;
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
  const { company } = await client.request(query, { id });
  return company;
}
