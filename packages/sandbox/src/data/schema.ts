export default `type AdminOperationMutation {
    deleteInvoice(_id: String!): Boolean
    updateInvoice(_id: String!, updateInvoice: UpdateInvoice!): Boolean
    """
    Returns PUT url to upload invoice
    """
    uploadInvoice(createInvoice: CreateInvoice!): PreUploadResponse
}

input CreateOperation {
    currency: Currency!
    name: String
    billedAt: String!
    source: String!
    amount: Int!
    paid: Boolean
}

type Employee {
    PESEL: String
    address: String
    """
    type of agreement
    """
    agreementPL: AgreementPL
    bankAccount: String
    birthDate: String
    firstName: String
    lastName: String
    salaryCost: Int
    salaryNet: Int
    """
    Current rate for the employee when sold to client
    """
    currentRate: Int
    employmentDate: String
}

type Mutation {
    adminMutation: AdminMutation
    publicMutation: PublicMutation
}

type AdminMutation {
    adminSourceMutation(_id: String!): AdminSourceMutation
    archiveSource(_id: String!): Boolean
    createSource(createSource: CreateSource!): String!
    deleteSource(_id: String!): Boolean
    setSourceAdmins(details: SourceUsernames!, _id: String!): Boolean
    setSourceVisibleFor(details: SourceUsernames!, _id: String!): Boolean
    unarchiveSource(_id: String!): Boolean
    updateSource(_id: String!, updateSource: UpdateSource!): Boolean
}

input SourceUsernames {
    usernames: [String!]!
}

input CreateSource {
    clientData: EditClientData
    employee: EditEmployee
    email: String
    phone: String
    NIP: String
    parentSource: String
    name: String!
    info: String
    client: Boolean!
    technologyTags: [String!] = []
}

type AdminQuery {
    externalSources: [ExternalSource!]
    source(_id: String!): Source!
    sources: [Source!]
    sourcesByParent(parentSourceId: String!, archived: Boolean, technologyTags: [String!] = []): [Source!]!
}

input UpdateSource {
    client: Boolean
    info: String
    employee: EditEmployee
    NIP: String
    clientData: EditClientData
    phone: String
    name: String
    parentSource: String
    email: String
    technologyTags: [String!] = []
}

type PreUploadResponse {
    getURL: String
    headers: Headers!
    putURL: String!
}

type ExternalSource implements Node {
    NIP: String
    _id: String!
    administrable: Boolean
    archivedAt: String
    clientData: ClientData
    createdAt: String!
    email: String
    employee: Employee
    info: String
    name: String!
    phone: String
    updatedAt: String!
}

interface Node {
    createdAt: String!
    updatedAt: String!
    administrable: Boolean
    _id: String!
}

input DateFilter {
    start: String!
    end: String
}

enum AgreementPL {
    zlecenieRyczalt
    zlecenie
    oPrace
    oDzielo
    B2B
}

input EditEmployee {
    birthDate: String
    firstName: String
    PESEL: String
    address: String
    bankAccount: String
    agreementPL: AgreementPL
    lastName: String
    salaryNet: Int
    salaryCost: Int
    currentRate: Int
    employmentDate: String
}

type Query {
    adminQuery: AdminQuery
    userQuery: UserQuery
}

type PublicMutation {
    login(login: Login!): String
    validateOtp(validateOTP: ValidateOTP!): String
}

type AdminSourceMutation {
    adminOperationMutation(_id: String!): AdminOperationMutation
    createContract(contract: CreateContract!): String
    createOperation(createOperation: CreateOperation!): String
    deleteContract(_id: String!): Boolean
    deleteDocument(_id: [String!]): Boolean
    deleteOperation(_id: String!): Boolean
    updateContract(_id: String!, contract: EditContract!): Boolean
    updateOperation(_id: String!, updateOperation: UpdateOperation!): Boolean
    uploadDocument(
        """
        returns PUT url to upload file
        """
        uploadDocument: UploadDocument!
    ): PreUploadResponse
    createVacation(vacation: CreateVacation!): String
    deleteVacation(_id: String!): Boolean
    searchCreateTag(tag: CreateTechnologyTag!): String
    deleteTechnologyTag(_id: String!): Boolean
}

input EditContract {
    sources: [EditContractSource!]!
    startDate: String
    endDate: String
    name: String
}

type Document implements Node & ExternalSourced {
    _id: String!
    administrable: Boolean
    createdAt: String!
    fileURL: String!
    name: String!
    source: ExternalSource!
    updatedAt: String!
}

scalar Headers

enum ContractRole {
    CONTRACTOR
    EMPLOYEE
    PRINCIPAL
}

type Invoice implements Node & ExternalSourced {
    _id: String!
    administrable: Boolean
    createdAt: String!
    dueDate: String!
    fileURL: String!
    operation: Operation!
    source: ExternalSource!
    updatedAt: String!
}

input EditClientData {
    address: String
    invoiceEmail: String
    entityName: String
}

input CreateContract {
    name: String
    sources: [EditContractSource!]!
    startDate: String!
    endDate: String
}

type Source implements Node {
    NIP: String
    _id: String!
    administrable: Boolean
    archivedAt: String
    client: Boolean
    clientData: ClientData
    contracts(date: DateFilter): [Contract!]
    createdAt: String!
    documents(date: DateFilter): [Document!]!
    email: String
    employee: Employee
    info: String
    invoices(date: DateFilter): [Invoice!]!
    name: String!
    operations(date: DateFilter): [Operation!]!
    phone: String
    updatedAt: String!
    vacations(date: DateFilter): [Vacation!]!
    administrators: [User!]
    observators: [User!]
    technologyTags: [TechnologyTag!]
    availableTags: [TechnologyTag!]
}

type Contract implements Node {
    _id: String!
    administrable: Boolean
    createdAt: String!
    endDate: String
    name: String
    sources: [ContractSource!]!
    startDate: String!
    updatedAt: String!
}

type User {
    username: String!
}

input EditContractSource {
    source: String!
    contractRole: ContractRole!
    startDate: String
    endDate: String
}

type ContractSource implements ExternalSourced {
    contractRole: ContractRole!
    endDate: String
    source: ExternalSource!
    startDate: String
}

type UserQuery {
    me: User
}

input Login {
    username: String!
    phone: String!
}

input UploadDocument {
    ContentType: String!
    source: String!
    name: String!
    filename: String!
}

input UpdateOperation {
    currency: Currency
    name: String
    billedAt: String
    source: String
    amount: Int
    paid: Boolean
}

type Operation implements Node & ExternalSourced {
    _id: String!
    administrable: Boolean
    """
    Amount should be positive or negative
    """
    amount: Int!
    billedAt: String!
    createdAt: String!
    currency: Currency!
    invoice: Invoice
    name: String
    paid: Boolean
    source: ExternalSource!
    updatedAt: String!
}

enum Currency {
    PLN
    EUR
    USD
}

input ValidateOTP {
    phone: String!
    otp: String!
}

input CreateInvoice {
    filename: String!
    ContentType: String!
    source: String!
    dueDate: String!
}

input UpdateInvoice {
    dueDate: String
}

type ClientData {
    address: String
    entityName: String
    invoiceEmail: String
}

type Vacation {
    createdAt: String!
    updatedAt: String!
    administrable: Boolean
    _id: String!
    source: ExternalSource!
    date: String!
}

interface ExternalSourced {
    source: ExternalSource!
}

input CreateVacation {
    source: String!
    date: String!
}

type TechnologyTag implements Node {
    name: String!
    createdAt: String!
    updatedAt: String!
    administrable: Boolean
    _id: String!
}

input CreateTechnologyTag {
    name: String!
}
schema {
    query: Query
    mutation: Mutation
}`;
