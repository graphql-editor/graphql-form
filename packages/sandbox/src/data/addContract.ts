import { FormFile } from 'graphql-form';

export const file = {
    forms: {
        Mutation: {
            node: {
                name: 'Mutation',
                type: {
                    fieldType: {
                        name: 'type',
                        type: 'name',
                    },
                    operations: ['mutation'],
                },
                data: {
                    type: 'ObjectTypeDefinition',
                },
                interfaces: [],
                directives: [],
                args: [
                    {
                        name: 'adminMutation',
                        args: [],
                        type: {
                            fieldType: {
                                name: 'AdminMutation',
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
                        name: 'publicMutation',
                        args: [],
                        type: {
                            fieldType: {
                                name: 'PublicMutation',
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
            value: '',
        },
        'Mutation.adminMutation': {
            node: {
                name: 'adminMutation',
                args: [],
                type: {
                    fieldType: {
                        name: 'AdminMutation',
                        type: 'name',
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
            value: '',
        },
        'Mutation.adminMutation.adminSourceMutation': {
            node: {
                name: 'adminSourceMutation',
                args: [
                    {
                        name: '_id',
                        directives: [],
                        type: {
                            fieldType: {
                                type: 'required',
                                nest: {
                                    name: 'String',
                                    type: 'name',
                                },
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                ],
                type: {
                    fieldType: {
                        name: 'AdminSourceMutation',
                        type: 'name',
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
            value: {
                _id: {
                    node: {
                        name: '_id',
                        directives: [],
                        type: {
                            fieldType: {
                                type: 'required',
                                nest: {
                                    name: 'String',
                                    type: 'name',
                                },
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                },
            },
        },
        'Mutation.adminMutation.adminSourceMutation.createContract': {
            node: {
                name: 'createContract',
                args: [
                    {
                        name: 'contract',
                        directives: [],
                        type: {
                            fieldType: {
                                type: 'required',
                                nest: {
                                    name: 'CreateContract',
                                    type: 'name',
                                },
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                ],
                type: {
                    fieldType: {
                        name: 'String',
                        type: 'name',
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
            value: {
                contract: {
                    node: {
                        name: 'contract',
                        directives: [],
                        type: {
                            fieldType: {
                                type: 'required',
                                nest: {
                                    name: 'CreateContract',
                                    type: 'name',
                                },
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                    value: {
                        endDate: {
                            node: {
                                name: 'endDate',
                                directives: [],
                                type: {
                                    fieldType: {
                                        name: 'String',
                                        type: 'name',
                                    },
                                },
                                data: {
                                    type: 'InputValueDefinition',
                                },
                                interfaces: [],
                                args: [],
                            },
                        },
                        name: {
                            node: {
                                name: 'name',
                                directives: [],
                                type: {
                                    fieldType: {
                                        name: 'String',
                                        type: 'name',
                                    },
                                },
                                data: {
                                    type: 'InputValueDefinition',
                                },
                                interfaces: [],
                                args: [],
                            },
                        },
                        sources: {
                            node: {
                                name: 'sources',
                                directives: [],
                                type: {
                                    fieldType: {
                                        type: 'required',
                                        nest: {
                                            type: 'array',
                                            nest: {
                                                type: 'required',
                                                nest: {
                                                    name: 'EditContractSource',
                                                    type: 'name',
                                                },
                                            },
                                        },
                                    },
                                },
                                data: {
                                    type: 'InputValueDefinition',
                                },
                                interfaces: [],
                                args: [],
                            },
                            value: [],
                        },
                        startDate: {
                            node: {
                                name: 'startDate',
                                directives: [],
                                type: {
                                    fieldType: {
                                        type: 'required',
                                        nest: {
                                            name: 'String',
                                            type: 'name',
                                        },
                                    },
                                },
                                data: {
                                    type: 'InputValueDefinition',
                                },
                                interfaces: [],
                                args: [],
                            },
                        },
                    },
                },
            },
        },
        'Mutation.adminMutation.adminSourceMutation.deleteDocument': {
            node: {
                name: 'deleteDocument',
                args: [
                    {
                        name: '_id',
                        directives: [],
                        type: {
                            fieldType: {
                                type: 'required',
                                nest: {
                                    name: 'String',
                                    type: 'name',
                                },
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                ],
                type: {
                    fieldType: {
                        name: 'Boolean',
                        type: 'name',
                    },
                },
                directives: [],
                interfaces: [],
                data: {
                    type: 'FieldDefinition',
                },
            },
            value: {
                _id: {
                    node: {
                        name: '_id',
                        directives: [],
                        type: {
                            fieldType: {
                                type: 'required',
                                nest: {
                                    name: 'String',
                                    type: 'name',
                                },
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                },
            },
        },
    },
} as FormFile;
export default file;
