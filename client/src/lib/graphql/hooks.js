import { useQuery } from "@apollo/client";
import { getCompanyByIdQuery, jobByIdQuery, jobsQuery } from "./queries";

export function useCompany(id){
  const {data, error ,loading} = useQuery(getCompanyByIdQuery, {
    variables: {id}
  });
  return {company: data?.company, error: Boolean(error) ,loading};
}

export function useJob(id){
    const {data, error, loading} = useQuery(jobByIdQuery, {
        variables: {id},
    });
    return {job: data?.job, error: Boolean(error), loading};
}

export function useJobs(){
    const {data, error, loading} = useQuery(jobsQuery, {
        fetchPolicy: 'network-only',
    });
    return {job: data?.job, error: Boolean(error), loading};
}