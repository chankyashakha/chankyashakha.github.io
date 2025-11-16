const GQL_ENDPOINT = "https://bikeautoparts.in/rss-hasura/v1/graphql";
const GQL_SECRET = "jaishreeram";

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const response = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": GQL_SECRET,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((e) => e.message).join(", "));
  }

  return result.data!;
}

export const QUERIES = {
  GET_CONTACTS: `
    query GetContacts {
      contact_data {
        address
        age
        basti_code
        dob
        full_name
        hindi_full_name
        id
        include_sons
        joining_date
        mobile
        org
        verified
      }
    }
  `,
};

export const MUTATIONS = {
  UPDATE_CONTACT: `
    mutation UpdateContact($id: Int!, $data: contact_data_set_input!) {
      update_contact_data_by_pk(pk_columns: {id: $id}, _set: $data) {
        id
        address
        age
        basti_code
        dob
        full_name
        hindi_full_name
        include_sons
        joining_date
        mobile
        org
        verified
      }
    }
  `,
  DELETE_CONTACT: `
    mutation DeleteContact($id: Int!) {
      delete_contact_data_by_pk(id: $id) {
        id
      }
    }
  `,
};
