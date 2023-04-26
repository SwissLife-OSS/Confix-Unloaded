import {graphql} from 'babel-plugin-relay/macro';

const applicationFragment = graphql`
  fragment Connections_applications on Application @relay(plural: true) {
    id
    name
    namespace
    parts {
      name
    }
  }
`;

const componentFragment = graphql`
  fragment Connections_components on Component @relay(plural: true) {
    id
    name
  }
`;

export const Connections = {
  applications: {
    name: 'Query_applications',
    fragment: applicationFragment,
  },
  components: {
    name: 'Query_components',
    fragment: componentFragment,
  },
};
