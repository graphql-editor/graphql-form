import { FormObject } from '../models';
import { ParserField, Parser } from 'graphql-js-tree';
import { parse } from 'graphql';

export const GqlToForm = (
    Gql: string,
    schema: string = testingSchema,
): { nodes: ParserField[]; fields: Record<string, FormObject> } | undefined => {
    const tree = Parser.parse(schema);

    const a = parse(Gql, { noLocation: true }) as any;
    console.log(a);
    const rootName = a.definitions.map((b: any) => b.name.value);
    console.log(rootName);

    const mutationNames = a.definitions.map((b: any) => b.selectionSet.selections[0].name.value);

    const fieldsValue = a.definitions.map((a: any) =>
        a.selectionSet.selections[0].arguments[0].value.fields.map((b: any) => ({
            [b.name.value]: b.value.value,
        })),
    );
    const selectedNode = tree.nodes.find((node) => node.name === a);
    if (selectedNode) {
        return {
            nodes: tree.nodes,
            fields: { [rootName]: { node: selectedNode } },
        };
    }

    return undefined;
};

const testingSchema = `input PathPointAchievementDescriptionInput{
	displayName: String!
}

type PathPoint implements Node{
	_id: String!
	name: String!
	text: String!
	pathOptions: [PathOption!]
	spawnItems: [Item!]
	discardItems: [Item!]
	achievements: [StoryAchievement!]
	createdAt: String!
}

type PathOption{
	text: String!
	requiredItems: [Item!]
	oneOfItems: [Item!]
	forbiddenItems: [Item!]
	pathPointId: String
	pathOptionType: PathOptionType
	nextPathPointIsRandom: Boolean
}

input CreatePathPoint{
	name: String!
	text: String!
	spawnItems: [IDInput!]
	discardItems: [IDInput!]
	achievements: [IDInput!]
	createPathOptions: [CreatePathOption!]
}

input CreatePathOption{
	pathPointId: String
	text: String!
	requiredItems: [IDInput!]
	oneOfItems: [IDInput!]
	forbiddenItems: [IDInput!]
	nextPathPointIsRandom: Boolean
	pathOptionType: PathOptionTypeInput
}

input EditPathPoint{
	name: String
	text: String
	spawnItems: [IDInput!]
	discardItems: [IDInput!]
	achievements: [IDInput!]
	editPathOptions: [CreatePathOption!]
}

enum StoryCategories{
	Dla_dzieci
	Horror
	Romans
	Thriller
	Kryminal
	Science_fiction
	Dramat
	Detektywistyczne
	Satyra
	Fantasy
	Dla_doroslych
}

enum StoryBadges{
	Siedem
	Szesnascie
	Osiemnascie
	Przemoc
	Dyskryminacja
	Seks
	Narkotyki
	Strach
	Wulgaryzmy
	Hazard
}

type Story implements Node{
	startId: String
	name: String!
	description: String!
	_id: String!
	items: [Item!]
	endings: [String!]
	categories: [StoryCategories!]
	badges: [StoryBadges!]
	pointsAll: [PathPoint!]!
	createdAt: String!
	author: String
	coverImage: String
	isPublished: Boolean
	publisher: String
	storyRating: StoryRating
	achievements: [StoryAchievement!]
	comments: [Comment!]
	lastEditedPathPoint: PathPoint
}

enum UserCommentReaction{
	LIKE
	DISLIKE
}

type Comment{
	_id: String!
	username: String!
	createdAt: String!
	text: String!
	likes: Int!
	dislikes: Int!
	userCommentReaction: UserCommentReaction
	userAvatar: UserAvatar
	userRating: Float
}

input CreateStory{
	name: String!
	description: String!
	author: String
	coverImage: String
	publisher: String
	categories: [StoryCategories!]
	badges: [StoryBadges!]
}

input EditStory{
	startId: String
	name: String
	description: String
	author: String
	coverImage: String
	isPublished: Boolean
	publisher: String
	categories: [StoryCategories!]
	badges: [StoryBadges!]
}

type Item implements Node{
	_id: String!
	name: String!
	description: String
	createdAt: String!
}

input AddItem{
	name: String!
	description: String
}

input DeleteItem{
	storyId: String!
	itemId: String!
}

type UserStorySave implements Node{
	_id: String!
	story: Story
	inventory: [Item!]!
	currentPathPoint: PathPoint
	createdAt: String!
	name: String!
	updatedAt: String!
}

input UpdateSave{
	currentPathPointId: String!
	items: [String!]
	_id: IDInput!
}

type Query{
	publicQuery: PublicQuery
	userQuery: UserQuery
	authorQuery: AuthorQuery
}

type UserQuery{
	saves: [UserStorySave!]!
	getStorySave(
		id: IDInput!
	): UserStorySave!
	me: User!
	getAchievements(
		storyId: String
	): [UserAchievement!]
	getFavouriteStories: [Story!]
}

type UserAchievement{
	achievement: StoryAchievement
	count: Int
}

type UserFavouriteStory{
	user: String!
	story: String!
}

type StoryRating{
	averageRating: Float!
	numberOfVotes: Int!
	userRating: Float
}

type PublicQuery{
	getStory(
		storyId: String!
	): Story
	listStory: [Story!]
	getCommonAchievements: [Achievement!]
}

type AuthorMutation{
	addStory(
		newStory: CreateStory!
	): String!
	deleteStory(
		id: IDInput!
	): Boolean
	editStory(
		id: IDInput!
		story: EditStory!
	): Boolean
	storyMutation(
		id: IDInput!
	): StoryMutation
	uploadFiles(
		fileUpload: [FileUpload!]!
	): [FileUploadResponse!]!
}

input AchievementStoryInput{
	displayName: String!
	storyId: String!
}

input AchievementPathPointInput{
	displayName: String!
	pathPointId: String!
}

input AddStoryRating{
	storyId: String!
	userRating: Float!
}

input AddStoryComment{
	storyId: String!
	text: String!
}

input AddCommentReaction{
	commentId: String!
	userReaction: UserCommentReaction!
}

type UserMutation{
	saveStoryProgress(
		save: UpdateSave!
	): String
	newSave(
		save: Save!
	): String
	deleteSave(
		saveId: String!
	): Boolean
	addAchievement(
		achievementId: String!
	): Boolean
	addStoryRating(
		rating: AddStoryRating!
	): Boolean
	addStoryComment(
		comment: AddStoryComment!
	): Boolean
	deleteStoryComment(
		commentId: String!
	): Boolean
	updateUser(
		updateUser: UpdateUser!
	): Boolean
	addStoryToFavourites(
		id: String!
	): Boolean
	removeStoryFromFavourites(
		id: String!
	): Boolean
	addReactionToComment(
		reaction: AddCommentReaction!
	): Boolean
	deleteUser: Boolean!
}

type Mutation{
	authorMutation: AuthorMutation
	userMutation: UserMutation
	login(
		login: Login!
	): String
	register(
		register: Register!
	): String
	validateOtp(
		validateOTP: ValidateOTP!
	): String
}

input IDInput{
	_id: String!
}

input EditItem{
	name: String
	description: String
}

type AuthorQuery{
	stories: [Story!]
	getStory(
		storyId: String!
	): Story
}

interface Node{
	createdAt: String!
	_id: String!
}

input UpdateUser{
	email: String
	avatar: UserAvatar
	roles: [Role!]
	yob: Int
	phone: String
}

input Register{
	username: String!
	phone: String!
}

input Login{
	phone: String!
}

input ValidateOTP{
	phone: String!
	otp: String!
}

enum UserAvatar{
	AVATAR_1
	AVATAR_2
	AVATAR_3
	AVATAR_4
	AVATAR_5
	AVATAR_6
	AVATAR_7
	AVATAR_8
	AVATAR_9
	AVATAR_10
	AVATAR_11
	AVATAR_12
}

type User{
	username: String!
	roles: [Role!]!
	avatar: UserAvatar
	email: String
	"""
	year of birth
	"""
	yob: Int
	phone: String!
	finishedEndings: Int
	lastFinishRepeated: Boolean
}

enum Role{
	AUTHOR
	CLIENT
	ADMIN
}

input Save{
	name: String!
	story: IDInput!
}

enum AchievementBadge{
	GWIAZDKA
	KLUCZ
	NOTES
	CZASZKA
	BUTELKA_Z_WIADOMOSCIA
	PINEZKA
	TROFEUM
	SERCE
	OSOBA
	FLAGA
	MAPA
	MONETA
	EGIPSKI_KLUCZ
	KONICZYNA
	MIECZ
	KRYSZTALEK
	KORONA
	ROBOT
	RAKIET
}

input AchievementInput{
	displayName: String!
	badge: AchievementBadge
	requiredCount: Int
}

type StoryMutation{
	addPathPoint(
		newPath: CreatePathPoint!
	): String!
	addNPathPoints(
		nPathPoints: CreateNPathPoints!
	): [String!]
	editPathPoint(
		pathPoint: EditPathPoint!
		id: IDInput!
	): Boolean
	deletePathPoint(
		id: IDInput!
	): Boolean
	addItem(
		item: AddItem!
	): String
	editItem(
		id: IDInput!
		item: EditItem!
	): Boolean
	deleteItem(
		id: IDInput!
	): Boolean
	deleteAchievement(
		achievementId: String!
	): Boolean
	editAchievement(
		achievementId: String!
		achievement: AchievementInput!
	): Boolean
	addAchievement(
		achievement: AchievementInput!
	): String
}

input CreateNPathPoints{
	nPoints: Int!
	prefix: String!
	startNumber: Int!
}

type FileUploadResponse{
	getUrl: String!
	putUrl: String!
}

input FileUpload{
	name: String!
	contentType: String!
}

enum PathOptionType{
	STANDARD
	COUNTING_MAX
	COUNTING_TIE
}

input PathOptionTypeInput{
	optionType: PathOptionType!
}

type CompletedStories{
	username: String!
	userCompletedStories: [CompletedStory!]
	a: [ID]
}

type CompletedStory{
	storyId: String!
	completedEndings: [String!]
}

interface Achievement{
	displayName: String!
	_id: String!
	badge: AchievementBadge
}

interface StoryAchievement{
	displayName: String!
	_id: String!
	badge: AchievementBadge
	story: Story
}

type MultiStoryAchievement implements StoryAchievement & Achievement{
	displayName: String!
	_id: String!
	badge: AchievementBadge
	story: Story
	requiredCount: Int!
}

type SingleStoryAchievement implements StoryAchievement & Achievement{
	displayName: String!
	story: Story
	_id: String!
	badge: AchievementBadge
}
schema{
	query: Query,
	mutation: Mutation
}
`;

const testingGql = `mutation
Mutation{
	register(
		registera: {
			phone: "+48123456789"
			username: "Jan Nowak"
		}
	)
}
`;

const a = GqlToForm(testingGql, testingSchema);
// console.log(a);
