const graphql = require('graphql')
const _ = require('lodash')

const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type:GraphQLString },
        phone: { type: GraphQLString },
    })
})

module.exports = UserType