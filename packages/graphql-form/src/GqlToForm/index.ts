import { FormObject } from '../models';
import { ParserField, Parser } from 'graphql-js-tree';
import {} from 'graphql';

export const GqlToForm = (
    Gql: string,
    schema: string = testingSchema,
): { nodes: ParserField[]; fields: Record<string, FormObject> } | undefined => {
    const tree = Parser.parse(schema);

    const nodeName = Gql.split('(')[0];
    const nodeValue = Gql.split('(')[1];
    console.log(nodeValue);

    const selectedNode = tree.nodes.find((node) => node.name === nodeName);
    if (selectedNode) {
        return {
            nodes: tree.nodes,
            fields: { [nodeName]: { node: selectedNode } },
        };
    }
};

const testingSchema = `input CreatePerson{
	firstName: String!
	lastName: String!
	age: Int!
	someFloat: Float
	someBoolean: Boolean
}

input UpdatePerson{
	firstName: String!
	lastName: String!
	age: Int!
	someFloat: Float
	someBoolean: Boolean
}

input DetailsPerson{
	_id: String!
}

type PersonWithId{
	_id: String!
	firstName: String!
	lastName: String!
	age: Int!
	someFloat: Float
	someBoolean: Boolean
}

type PersonQuery{
	readAll: [PersonWithId!]!
	readOne(
		details: DetailsPerson
	): PersonWithId
}

type PersonMutation{
	create(
		person: CreatePerson
	): String!
	update(
		person: UpdatePerson
		details: DetailsPerson
	): Boolean!
	delete(
		details: DetailsPerson
	): Boolean!
}

input CreateCar{
	mark: String!
	price: Float!
	model: String
}

input UpdateCar{
	mark: String!
	price: Float!
	model: String
}

input DetailsCar{
	_id: String!
}

type CarWithId{
	_id: String!
	mark: String!
	price: Float!
	model: String
}

type CarQuery{
	readAll: [CarWithId!]!
	readOne(
		details: DetailsCar
	): CarWithId
}

type CarMutation{
	create(
		car: CreateCar
	): String!
	update(
		car: UpdateCar
		details: DetailsCar
	): Boolean!
	delete(
		details: DetailsCar
	): Boolean!
}

type Person {
	firstName: String!
	lastName: String!
	age: Int!
	someFloat: Float
	someBoolean: Boolean
}

type Car {
	mark: String!
	price: Float!
	model: String
}

type Query{
	person: PersonQuery
	car: CarQuery
}

type Mutation{
	person: PersonMutation
	car: CarMutation
}
schema{
	query: Query,
	mutation: Mutation
}
`;

const testingGql = `Mutation {
						PersonMutation ({
							create: {
								firstName: "Jan"
								lastName: "Nowak"
								age: 40
								someBoolean: true

}})}`;

const a = GqlToForm(testingGql, testingSchema);
console.log(a);

// testInput - name of the node
// object - value of Record
// testInput(
//     testInput: [object Object]
// )
