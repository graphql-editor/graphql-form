export type ModelTypes = {
    ['Login']: {
        phone: string;
        username: string;
    };
    ['DateFilter']: {
        start: string;
        end?: string | undefined;
    };
    ['Invoice']: {
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        dueDate: string;
        fileURL: string;
        operation: ModelTypes['Operation'];
        source: ModelTypes['ExternalSource'];
        updatedAt: string;
    };
    ['Operation']: {
        _id: string;
        administrable?: boolean | undefined;
        /** Amount should be positive or negative */
        amount: number;
        billedAt: string;
        createdAt: string;
        currency: ModelTypes['Currency'];
        invoice?: ModelTypes['Invoice'] | undefined;
        name?: string | undefined;
        paid?: boolean | undefined;
        source: ModelTypes['ExternalSource'];
        updatedAt: string;
    };
    ['User']: {
        username: string;
    };
    ['UpdateVentureProject']: {
        name?: string | undefined;
        sources?: Array<string> | undefined;
    };
    ['CreateTechnologyTag']: {
        name: string;
    };
    ['Employee']: {
        PESEL?: string | undefined;
        address?: string | undefined;
        /** type of agreement */
        agreementPL?: ModelTypes['AgreementPL'] | undefined;
        bankAccount?: string | undefined;
        birthDate?: string | undefined;
        /** Current rate for the employee when sold to client */
        currentRate?: number | undefined;
        employmentDate?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        salaryCost?: number | undefined;
        salaryNet?: number | undefined;
        yearlyVacationDays?: number | undefined;
    };
    ['Headers']: any;
    ['UserQuery']: {
        me?: ModelTypes['User'] | undefined;
    };
    ['ContractSource']: {
        contractRole: ModelTypes['ContractRole'];
        endDate?: string | undefined;
        source: ModelTypes['ExternalSource'];
        startDate?: string | undefined;
    };
    ['UpdateInvoice']: {
        dueDate?: string | undefined;
    };
    ['ClientData']: {
        address?: string | undefined;
        entityName?: string | undefined;
        invoiceEmail?: string | undefined;
    };
    ['CreateVentureProject']: {
        sources?: Array<string> | undefined;
        name: string;
    };
    ['EditContract']: {
        sources: Array<ModelTypes['EditContractSource']>;
        startDate?: string | undefined;
        endDate?: string | undefined;
        name?: string | undefined;
    };
    ['ExternalSource']: {
        NIP?: string | undefined;
        _id: string;
        administrable?: boolean | undefined;
        archivedAt?: string | undefined;
        clientData?: ModelTypes['ClientData'] | undefined;
        createdAt: string;
        email?: string | undefined;
        employee?: ModelTypes['Employee'] | undefined;
        info?: string | undefined;
        name: string;
        phone?: string | undefined;
        technologyTags?: Array<ModelTypes['TechnologyTag']> | undefined;
        updatedAt: string;
    };
    ['Mutation']: {
        adminMutation?: ModelTypes['AdminMutation'] | undefined;
        publicMutation?: ModelTypes['PublicMutation'] | undefined;
    };
    ['CreateSource']: {
        parentSource?: string | undefined;
        name: string;
        client?: boolean | undefined;
        email?: string | undefined;
        info?: string | undefined;
        clientData?: ModelTypes['EditClientData'] | undefined;
        employee?: ModelTypes['EditEmployee'] | undefined;
        phone?: string | undefined;
        NIP?: string | undefined;
        technologyTags?: Array<string> | undefined;
    };
    ['UpdateSource']: {
        info?: string | undefined;
        phone?: string | undefined;
        clientData?: ModelTypes['EditClientData'] | undefined;
        client?: boolean | undefined;
        technologyTags?: Array<string> | undefined;
        employee?: ModelTypes['EditEmployee'] | undefined;
        NIP?: string | undefined;
        name?: string | undefined;
        parentSource?: string | undefined;
        email?: string | undefined;
    };
    ['Node']:
        | ModelTypes['Invoice']
        | ModelTypes['Operation']
        | ModelTypes['ExternalSource']
        | ModelTypes['TechnologyTag']
        | ModelTypes['VentureProject']
        | ModelTypes['Document']
        | ModelTypes['Source']
        | ModelTypes['Contract'];
    ['TechnologyTag']: {
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        name: string;
        updatedAt: string;
    };
    ['EditClientData']: {
        address?: string | undefined;
        invoiceEmail?: string | undefined;
        entityName?: string | undefined;
    };
    ['Query']: {
        adminQuery?: ModelTypes['AdminQuery'] | undefined;
        userQuery?: ModelTypes['UserQuery'] | undefined;
    };
    ['EditEmployee']: {
        bankAccount?: string | undefined;
        salaryNet?: number | undefined;
        birthDate?: string | undefined;
        address?: string | undefined;
        agreementPL?: ModelTypes['AgreementPL'] | undefined;
        employmentDate?: string | undefined;
        firstName?: string | undefined;
        PESEL?: string | undefined;
        lastName?: string | undefined;
        currentRate?: number | undefined;
        yearlyVacationDays?: number | undefined;
        salaryCost?: number | undefined;
    };
    ['AdminOperationMutation']: {
        deleteInvoice?: boolean | undefined;
        updateInvoice?: boolean | undefined;
        /** Returns PUT url to upload invoice */
        uploadInvoice?: ModelTypes['PreUploadResponse'] | undefined;
    };
    ['ValidateOTP']: {
        otp: string;
        phone: string;
    };
    ['PreUploadResponse']: {
        getURL?: string | undefined;
        headers: ModelTypes['Headers'];
        putURL: string;
    };
    ['VentureProject']: {
        _id: string;
        administrable?: boolean | undefined;
        archivedAt?: string | undefined;
        createdAt: string;
        name: string;
        sources?: Array<ModelTypes['ExternalSource']> | undefined;
        updatedAt: string;
    };
    ['ContractRole']: ContractRole;
    ['AdminMutation']: {
        adminSourceMutation?: ModelTypes['AdminSourceMutation'] | undefined;
        archiveSource?: boolean | undefined;
        createSource: string;
        deleteSource?: boolean | undefined;
        setSourceAdmins?: boolean | undefined;
        setSourceVisibleFor?: boolean | undefined;
        unarchiveSource?: boolean | undefined;
        updateSource?: boolean | undefined;
    };
    ['UpdateOperation']: {
        source?: string | undefined;
        amount?: number | undefined;
        paid?: boolean | undefined;
        currency?: ModelTypes['Currency'] | undefined;
        name?: string | undefined;
        billedAt?: string | undefined;
    };
    ['CreateContract']: {
        name?: string | undefined;
        sources: Array<ModelTypes['EditContractSource']>;
        startDate: string;
        endDate?: string | undefined;
    };
    ['UploadDocument']: {
        ContentType: string;
        source: string;
        name: string;
        filename: string;
    };
    ['CreateOperation']: {
        name?: string | undefined;
        billedAt: string;
        source: string;
        amount: number;
        paid?: boolean | undefined;
        currency: ModelTypes['Currency'];
    };
    ['PublicMutation']: {
        login?: string | undefined;
        validateOtp?: string | undefined;
    };
    ['CreateVacation']: {
        date: string;
        source: string;
    };
    ['Document']: {
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        fileURL: string;
        name: string;
        source: ModelTypes['ExternalSource'];
        updatedAt: string;
    };
    ['AgreementPL']: AgreementPL;
    ['Currency']: Currency;
    ['CreateInvoice']: {
        filename: string;
        ContentType: string;
        source: string;
        dueDate: string;
    };
    ['Source']: {
        NIP?: string | undefined;
        _id: string;
        administrable?: boolean | undefined;
        administrators?: Array<ModelTypes['User']> | undefined;
        archivedAt?: string | undefined;
        availableTags?: Array<ModelTypes['TechnologyTag']> | undefined;
        client?: boolean | undefined;
        clientData?: ModelTypes['ClientData'] | undefined;
        contracts?: Array<ModelTypes['Contract']> | undefined;
        createdAt: string;
        documents: Array<ModelTypes['Document']>;
        email?: string | undefined;
        employee?: ModelTypes['Employee'] | undefined;
        info?: string | undefined;
        invoices: Array<ModelTypes['Invoice']>;
        name: string;
        observators?: Array<ModelTypes['User']> | undefined;
        operations: Array<ModelTypes['Operation']>;
        phone?: string | undefined;
        technologyTags?: Array<ModelTypes['TechnologyTag']> | undefined;
        updatedAt: string;
        vacationDaysLeft?: number | undefined;
        vacations: Array<ModelTypes['Vacation']>;
        ventureProject?: ModelTypes['VentureProject'] | undefined;
        ventureProjects?: Array<ModelTypes['VentureProject']> | undefined;
    };
    ['ExternalSourced']:
        | ModelTypes['Invoice']
        | ModelTypes['Operation']
        | ModelTypes['ContractSource']
        | ModelTypes['Document'];
    ['Vacation']: {
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        date: string;
        source: ModelTypes['ExternalSource'];
        updatedAt: string;
    };
    ['AdminSourceMutation']: {
        adminOperationMutation?: ModelTypes['AdminOperationMutation'] | undefined;
        archiveVentureProject?: boolean | undefined;
        createContract?: string | undefined;
        createOperation?: string | undefined;
        createVacation?: string | undefined;
        createVentureProject?: boolean | undefined;
        deleteContract?: boolean | undefined;
        deleteDocument?: boolean | undefined;
        deleteOperation?: boolean | undefined;
        deleteTechnologyTag?: boolean | undefined;
        deleteVacation?: boolean | undefined;
        searchCreateTag?: string | undefined;
        unarchiveVentureProject?: boolean | undefined;
        updateContract?: boolean | undefined;
        updateOperation?: boolean | undefined;
        updateVentureProject?: boolean | undefined;
        uploadDocument?: ModelTypes['PreUploadResponse'] | undefined;
    };
    ['EditContractSource']: {
        startDate?: string | undefined;
        endDate?: string | undefined;
        source: string;
        contractRole: ModelTypes['ContractRole'];
    };
    ['AdminQuery']: {
        externalSources?: Array<ModelTypes['ExternalSource']> | undefined;
        source: ModelTypes['Source'];
        sources?: Array<ModelTypes['Source']> | undefined;
        sourcesByParent: Array<ModelTypes['Source']>;
    };
    ['Contract']: {
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        endDate?: string | undefined;
        name?: string | undefined;
        sources: Array<ModelTypes['ContractSource']>;
        startDate: string;
        updatedAt: string;
    };
    ['SourceUsernames']: {
        usernames: Array<string>;
    };
};

export type GraphQLTypes = {
    ['Login']: {
        phone: string;
        username: string;
    };
    ['DateFilter']: {
        start: string;
        end?: string | undefined;
    };
    ['Invoice']: {
        __typename: 'Invoice';
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        dueDate: string;
        fileURL: string;
        operation: GraphQLTypes['Operation'];
        source: GraphQLTypes['ExternalSource'];
        updatedAt: string;
    };
    ['Operation']: {
        __typename: 'Operation';
        _id: string;
        administrable?: boolean | undefined;
        /** Amount should be positive or negative */
        amount: number;
        billedAt: string;
        createdAt: string;
        currency: GraphQLTypes['Currency'];
        invoice?: GraphQLTypes['Invoice'] | undefined;
        name?: string | undefined;
        paid?: boolean | undefined;
        source: GraphQLTypes['ExternalSource'];
        updatedAt: string;
    };
    ['User']: {
        __typename: 'User';
        username: string;
    };
    ['UpdateVentureProject']: {
        name?: string | undefined;
        sources?: Array<string> | undefined;
    };
    ['CreateTechnologyTag']: {
        name: string;
    };
    ['Employee']: {
        __typename: 'Employee';
        PESEL?: string | undefined;
        address?: string | undefined;
        /** type of agreement */
        agreementPL?: GraphQLTypes['AgreementPL'] | undefined;
        bankAccount?: string | undefined;
        birthDate?: string | undefined;
        /** Current rate for the employee when sold to client */
        currentRate?: number | undefined;
        employmentDate?: string | undefined;
        firstName?: string | undefined;
        lastName?: string | undefined;
        salaryCost?: number | undefined;
        salaryNet?: number | undefined;
        yearlyVacationDays?: number | undefined;
    };
    ['Headers']: 'scalar' & { name: 'Headers' };
    ['UserQuery']: {
        __typename: 'UserQuery';
        me?: GraphQLTypes['User'] | undefined;
    };
    ['ContractSource']: {
        __typename: 'ContractSource';
        contractRole: GraphQLTypes['ContractRole'];
        endDate?: string | undefined;
        source: GraphQLTypes['ExternalSource'];
        startDate?: string | undefined;
    };
    ['UpdateInvoice']: {
        dueDate?: string | undefined;
    };
    ['ClientData']: {
        __typename: 'ClientData';
        address?: string | undefined;
        entityName?: string | undefined;
        invoiceEmail?: string | undefined;
    };
    ['CreateVentureProject']: {
        sources?: Array<string> | undefined;
        name: string;
    };
    ['EditContract']: {
        sources: Array<GraphQLTypes['EditContractSource']>;
        startDate?: string | undefined;
        endDate?: string | undefined;
        name?: string | undefined;
    };
    ['ExternalSource']: {
        __typename: 'ExternalSource';
        NIP?: string | undefined;
        _id: string;
        administrable?: boolean | undefined;
        archivedAt?: string | undefined;
        clientData?: GraphQLTypes['ClientData'] | undefined;
        createdAt: string;
        email?: string | undefined;
        employee?: GraphQLTypes['Employee'] | undefined;
        info?: string | undefined;
        name: string;
        phone?: string | undefined;
        technologyTags?: Array<GraphQLTypes['TechnologyTag']> | undefined;
        updatedAt: string;
    };
    ['Mutation']: {
        __typename: 'Mutation';
        adminMutation?: GraphQLTypes['AdminMutation'] | undefined;
        publicMutation?: GraphQLTypes['PublicMutation'] | undefined;
    };
    ['CreateSource']: {
        parentSource?: string | undefined;
        name: string;
        client?: boolean | undefined;
        email?: string | undefined;
        info?: string | undefined;
        clientData?: GraphQLTypes['EditClientData'] | undefined;
        employee?: GraphQLTypes['EditEmployee'] | undefined;
        phone?: string | undefined;
        NIP?: string | undefined;
        technologyTags?: Array<string> | undefined;
    };
    ['UpdateSource']: {
        info?: string | undefined;
        phone?: string | undefined;
        clientData?: GraphQLTypes['EditClientData'] | undefined;
        client?: boolean | undefined;
        technologyTags?: Array<string> | undefined;
        employee?: GraphQLTypes['EditEmployee'] | undefined;
        NIP?: string | undefined;
        name?: string | undefined;
        parentSource?: string | undefined;
        email?: string | undefined;
    };
    ['Node']: {
        __typename:
            | 'Invoice'
            | 'Operation'
            | 'ExternalSource'
            | 'TechnologyTag'
            | 'VentureProject'
            | 'Document'
            | 'Source'
            | 'Contract';
        createdAt: string;
        updatedAt: string;
        administrable?: boolean | undefined;
        _id: string;
        ['...on Invoice']: '__union' & GraphQLTypes['Invoice'];
        ['...on Operation']: '__union' & GraphQLTypes['Operation'];
        ['...on ExternalSource']: '__union' & GraphQLTypes['ExternalSource'];
        ['...on TechnologyTag']: '__union' & GraphQLTypes['TechnologyTag'];
        ['...on VentureProject']: '__union' & GraphQLTypes['VentureProject'];
        ['...on Document']: '__union' & GraphQLTypes['Document'];
        ['...on Source']: '__union' & GraphQLTypes['Source'];
        ['...on Contract']: '__union' & GraphQLTypes['Contract'];
    };
    ['TechnologyTag']: {
        __typename: 'TechnologyTag';
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        name: string;
        updatedAt: string;
    };
    ['EditClientData']: {
        address?: string | undefined;
        invoiceEmail?: string | undefined;
        entityName?: string | undefined;
    };
    ['Query']: {
        __typename: 'Query';
        adminQuery?: GraphQLTypes['AdminQuery'] | undefined;
        userQuery?: GraphQLTypes['UserQuery'] | undefined;
    };
    ['EditEmployee']: {
        bankAccount?: string | undefined;
        salaryNet?: number | undefined;
        birthDate?: string | undefined;
        address?: string | undefined;
        agreementPL?: GraphQLTypes['AgreementPL'] | undefined;
        employmentDate?: string | undefined;
        firstName?: string | undefined;
        PESEL?: string | undefined;
        lastName?: string | undefined;
        currentRate?: number | undefined;
        yearlyVacationDays?: number | undefined;
        salaryCost?: number | undefined;
    };
    ['AdminOperationMutation']: {
        __typename: 'AdminOperationMutation';
        deleteInvoice?: boolean | undefined;
        updateInvoice?: boolean | undefined;
        /** Returns PUT url to upload invoice */
        uploadInvoice?: GraphQLTypes['PreUploadResponse'] | undefined;
    };
    ['ValidateOTP']: {
        otp: string;
        phone: string;
    };
    ['PreUploadResponse']: {
        __typename: 'PreUploadResponse';
        getURL?: string | undefined;
        headers: GraphQLTypes['Headers'];
        putURL: string;
    };
    ['VentureProject']: {
        __typename: 'VentureProject';
        _id: string;
        administrable?: boolean | undefined;
        archivedAt?: string | undefined;
        createdAt: string;
        name: string;
        sources?: Array<GraphQLTypes['ExternalSource']> | undefined;
        updatedAt: string;
    };
    ['ContractRole']: ContractRole;
    ['AdminMutation']: {
        __typename: 'AdminMutation';
        adminSourceMutation?: GraphQLTypes['AdminSourceMutation'] | undefined;
        archiveSource?: boolean | undefined;
        createSource: string;
        deleteSource?: boolean | undefined;
        setSourceAdmins?: boolean | undefined;
        setSourceVisibleFor?: boolean | undefined;
        unarchiveSource?: boolean | undefined;
        updateSource?: boolean | undefined;
    };
    ['UpdateOperation']: {
        source?: string | undefined;
        amount?: number | undefined;
        paid?: boolean | undefined;
        currency?: GraphQLTypes['Currency'] | undefined;
        name?: string | undefined;
        billedAt?: string | undefined;
    };
    ['CreateContract']: {
        name?: string | undefined;
        sources: Array<GraphQLTypes['EditContractSource']>;
        startDate: string;
        endDate?: string | undefined;
    };
    ['UploadDocument']: {
        ContentType: string;
        source: string;
        name: string;
        filename: string;
    };
    ['CreateOperation']: {
        name?: string | undefined;
        billedAt: string;
        source: string;
        amount: number;
        paid?: boolean | undefined;
        currency: GraphQLTypes['Currency'];
    };
    ['PublicMutation']: {
        __typename: 'PublicMutation';
        login?: string | undefined;
        validateOtp?: string | undefined;
    };
    ['CreateVacation']: {
        date: string;
        source: string;
    };
    ['Document']: {
        __typename: 'Document';
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        fileURL: string;
        name: string;
        source: GraphQLTypes['ExternalSource'];
        updatedAt: string;
    };
    ['AgreementPL']: AgreementPL;
    ['Currency']: Currency;
    ['CreateInvoice']: {
        filename: string;
        ContentType: string;
        source: string;
        dueDate: string;
    };
    ['Source']: {
        __typename: 'Source';
        NIP?: string | undefined;
        _id: string;
        administrable?: boolean | undefined;
        administrators?: Array<GraphQLTypes['User']> | undefined;
        archivedAt?: string | undefined;
        availableTags?: Array<GraphQLTypes['TechnologyTag']> | undefined;
        client?: boolean | undefined;
        clientData?: GraphQLTypes['ClientData'] | undefined;
        contracts?: Array<GraphQLTypes['Contract']> | undefined;
        createdAt: string;
        documents: Array<GraphQLTypes['Document']>;
        email?: string | undefined;
        employee?: GraphQLTypes['Employee'] | undefined;
        info?: string | undefined;
        invoices: Array<GraphQLTypes['Invoice']>;
        name: string;
        observators?: Array<GraphQLTypes['User']> | undefined;
        operations: Array<GraphQLTypes['Operation']>;
        phone?: string | undefined;
        technologyTags?: Array<GraphQLTypes['TechnologyTag']> | undefined;
        updatedAt: string;
        vacationDaysLeft?: number | undefined;
        vacations: Array<GraphQLTypes['Vacation']>;
        ventureProject?: GraphQLTypes['VentureProject'] | undefined;
        ventureProjects?: Array<GraphQLTypes['VentureProject']> | undefined;
    };
    ['ExternalSourced']: {
        __typename: 'Invoice' | 'Operation' | 'ContractSource' | 'Document';
        source: GraphQLTypes['ExternalSource'];
        ['...on Invoice']: '__union' & GraphQLTypes['Invoice'];
        ['...on Operation']: '__union' & GraphQLTypes['Operation'];
        ['...on ContractSource']: '__union' & GraphQLTypes['ContractSource'];
        ['...on Document']: '__union' & GraphQLTypes['Document'];
    };
    ['Vacation']: {
        __typename: 'Vacation';
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        date: string;
        source: GraphQLTypes['ExternalSource'];
        updatedAt: string;
    };
    ['AdminSourceMutation']: {
        __typename: 'AdminSourceMutation';
        adminOperationMutation?: GraphQLTypes['AdminOperationMutation'] | undefined;
        archiveVentureProject?: boolean | undefined;
        createContract?: string | undefined;
        createOperation?: string | undefined;
        createVacation?: string | undefined;
        createVentureProject?: boolean | undefined;
        deleteContract?: boolean | undefined;
        deleteDocument?: boolean | undefined;
        deleteOperation?: boolean | undefined;
        deleteTechnologyTag?: boolean | undefined;
        deleteVacation?: boolean | undefined;
        searchCreateTag?: string | undefined;
        unarchiveVentureProject?: boolean | undefined;
        updateContract?: boolean | undefined;
        updateOperation?: boolean | undefined;
        updateVentureProject?: boolean | undefined;
        uploadDocument?: GraphQLTypes['PreUploadResponse'] | undefined;
    };
    ['EditContractSource']: {
        startDate?: string | undefined;
        endDate?: string | undefined;
        source: string;
        contractRole: GraphQLTypes['ContractRole'];
    };
    ['AdminQuery']: {
        __typename: 'AdminQuery';
        externalSources?: Array<GraphQLTypes['ExternalSource']> | undefined;
        source: GraphQLTypes['Source'];
        sources?: Array<GraphQLTypes['Source']> | undefined;
        sourcesByParent: Array<GraphQLTypes['Source']>;
    };
    ['Contract']: {
        __typename: 'Contract';
        _id: string;
        administrable?: boolean | undefined;
        createdAt: string;
        endDate?: string | undefined;
        name?: string | undefined;
        sources: Array<GraphQLTypes['ContractSource']>;
        startDate: string;
        updatedAt: string;
    };
    ['SourceUsernames']: {
        usernames: Array<string>;
    };
};
export const enum ContractRole {
    CONTRACTOR = 'CONTRACTOR',
    EMPLOYEE = 'EMPLOYEE',
    PRINCIPAL = 'PRINCIPAL',
}
export const enum AgreementPL {
    oPrace = 'oPrace',
    oDzielo = 'oDzielo',
    B2B = 'B2B',
    zlecenieRyczalt = 'zlecenieRyczalt',
    zlecenie = 'zlecenie',
}
export const enum Currency {
    USD = 'USD',
    PLN = 'PLN',
    EUR = 'EUR',
}
