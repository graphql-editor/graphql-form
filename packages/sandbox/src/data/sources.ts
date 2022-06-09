import { FormFile } from 'graphql-form';

const file = {
    forms: {
        Query: {
            node: {
                name: 'Query',
                type: {
                    fieldType: {
                        name: 'type',
                        type: 'name',
                    },
                    operations: ['query'],
                },
                data: {
                    type: 'ObjectTypeDefinition',
                },
                interfaces: [],
                directives: [],
                args: [
                    {
                        name: 'adminQuery',
                        args: [],
                        type: {
                            fieldType: {
                                name: 'AdminQuery',
                                type: 'name',
                            },
                        },
                        directives: [],
                        interfaces: [],
                        data: {
                            type: 'FieldDefinition',
                        },
                    },
                    {
                        name: 'userQuery',
                        args: [],
                        type: {
                            fieldType: {
                                name: 'UserQuery',
                                type: 'name',
                            },
                        },
                        directives: [],
                        interfaces: [],
                        data: {
                            type: 'FieldDefinition',
                        },
                    },
                ],
            },
        },
        'Query.adminQuery': {
            node: {
                name: 'adminQuery',
                args: [],
                type: {
                    fieldType: {
                        name: 'AdminQuery',
                        type: 'name',
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
        },
        'Query.adminQuery.sources': {
            node: {
                name: 'sources',
                args: [],
                type: {
                    fieldType: {
                        type: 'array',
                        nest: {
                            type: 'required',
                            nest: {
                                name: 'Source',
                                type: 'name',
                            },
                        },
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
        },
        'Query.adminQuery.sources.name': {
            node: {
                name: 'name',
                args: [],
                type: {
                    fieldType: {
                        type: 'required',
                        nest: {
                            name: 'String',
                            type: 'name',
                        },
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
        },
    },
} as FormFile;
export default file;
