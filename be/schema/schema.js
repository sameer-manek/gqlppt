const graphql = require('graphql')
const _ = require('lodash')

const mongoose = require('mongoose')

const User = require('../models/user')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const UserType = require('./userSchema')


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async function (parent, args) {
                let user =  await User.findOne({ email: args.email, password: args.password})

                if(user) {
                    return user
                } else {
                    return null
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: async function (parent, args) {
                let user = new User({
                    name: args.name,
                    email: args.email,
                    password: args.password
                })

                let commit = user.save()

                return commit
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
