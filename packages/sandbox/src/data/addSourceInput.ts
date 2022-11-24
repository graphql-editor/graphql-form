import { FormFile } from 'graphql-form';

const file = {
    widgets: {},
    forms: {
        NIP: {
            node: {
                name: 'NIP',
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
            value: 'dsddaasd',
        },
        client: {
            node: {
                name: 'client',
                directives: [],
                type: {
                    fieldType: {
                        type: 'required',
                        nest: {
                            name: 'Boolean',
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
        clientData: {
            node: {
                name: 'clientData',
                directives: [],
                type: {
                    fieldType: {
                        name: 'EditClientData',
                        type: 'name',
                    },
                },
                data: {
                    type: 'InputValueDefinition',
                },
                interfaces: [],
                args: [],
            },
            value: {
                address: {
                    node: {
                        name: 'address',
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
                    value: '',
                },
                entityName: {
                    node: {
                        name: 'entityName',
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
                invoiceEmail: {
                    node: {
                        name: 'invoiceEmail',
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
            },
        },
        email: {
            node: {
                name: 'email',
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
        employee: {
            node: {
                name: 'employee',
                directives: [],
                type: {
                    fieldType: {
                        name: 'EditEmployee',
                        type: 'name',
                    },
                },
                data: {
                    type: 'InputValueDefinition',
                },
                interfaces: [],
                args: [],
            },
            value: {
                PESEL: {
                    node: {
                        name: 'PESEL',
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
                address: {
                    node: {
                        name: 'address',
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
                agreementPL: {
                    node: {
                        name: 'agreementPL',
                        directives: [],
                        type: {
                            fieldType: {
                                name: 'AgreementPL',
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
                bankAccount: {
                    node: {
                        name: 'bankAccount',
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
                birthDate: {
                    node: {
                        name: 'birthDate',
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
                currentRate: {
                    node: {
                        name: 'currentRate',
                        directives: [],
                        type: {
                            fieldType: {
                                name: 'Int',
                                type: 'name',
                            },
                        },
                        data: {
                            type: 'InputValueDefinition',
                        },
                        interfaces: [],
                        args: [],
                    },
                    value: '0',
                },
                firstName: {
                    node: {
                        name: 'firstName',
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
                lastName: {
                    node: {
                        name: 'lastName',
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
                salaryCost: {
                    node: {
                        name: 'salaryCost',
                        directives: [],
                        type: {
                            fieldType: {
                                name: 'Int',
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
                salaryNet: {
                    node: {
                        name: 'salaryNet',
                        directives: [],
                        type: {
                            fieldType: {
                                name: 'Int',
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
            },
        },
        info: {
            node: {
                name: 'info',
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
        parentSource: {
            node: {
                name: 'parentSource',
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
        phone: {
            node: {
                name: 'phone',
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
    },
} as FormFile;
export default file;
