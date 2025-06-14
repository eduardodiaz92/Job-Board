import { useQuery } from "@apollo/client";
import { getCompanyByIdQuery } from "./queries";

export function useCompany(id){
  const {data, error ,loading} = useQuery(getCompanyByIdQuery, {
    variables: {id}
  });
  return {company: data?.company, error: Boolean(error) ,loading};
}