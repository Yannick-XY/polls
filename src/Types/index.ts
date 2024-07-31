/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export { Activity, Activities } from '../stores/activity.ts'
export { UpdateType, Group, AppSettings } from '../stores/appSettings.ts'
export { Subscription } from '../stores/subscription.ts'
export { Combo, Participant } from '../stores/combo.ts'
export { Comment, Comments, CommentsGrouped } from '../stores/comments.ts'
export { Poll, PollType, AccessType, ShowResults, AllowProposals, PollConfiguration, PollStatus, PollPermissions, CurrentUserStatus } from '../stores/poll.ts'
export { SortType, FilterType, PollCategory, Meta, PollList } from '../stores/polls.ts'
export { Option, OptionVotes, Sequence, Shift, SimpleOption, Options } from '../stores/options.ts'
export { Share } from '../stores/share.ts'
export { Shares } from '../stores/shares.ts'
export { Route, UserStatus, Session } from '../stores/session.ts'
export { UserPreferences, SessionSettings, Calendar, Preferences, ViewMode } from '../stores/preferences.ts'
export { Answer, AnswerSymbol, Vote, Votes } from '../stores/votes.ts'

export enum StatusResults {
	Error = 'error',
	Warning = 'warning',
	Success = 'success',
	Loading = 'loading',
	Loaded = 'loaded',
}

export enum SignalingType {
	None = '',
	Empty = 'empty',
	Error = 'error',
	Valid = 'valid',
	InValid = 'invalid',
	Success = 'success',
	Checking = 'checking',
}

export enum UserType {
	Email = 'email',
	External = 'external',
	Contact = 'contact',
	User = 'user',
	Group = 'group',
	Admin = 'admin',
	Public = 'public',
	Circle = 'circle',
	ContactGroup = 'contactGroup',
	None = '',
}

export enum VirtualUserItemType {
	AddPublicLink = 'addPublicLink',
	InternalAccess = 'internalAccess',
	Deleted = 'deleted',
	Anonymous = 'anonymous',
}

export enum BoxType {
	Text = 'textBox',
	Date = 'dateBox',
}

// export type AppSettings = {
// 	usePrivacyUrl: string,
// 	useImprintUrl: string,
// 	useLogin: boolean
// 	useActivity: boolean
// 	navigationPollsInList: boolean
// 	updateType: UpdateType,
// }

export type AppPermissions = {
	allAccess: boolean
	publicShares: boolean
	pollCreation: boolean
	seeMailAddresses: boolean
	pollDownload: boolean
	comboView: boolean
}

export type User = {
	userId: string
	displayName: string
	emailAddress: string
	subName: string
	subtitle: string
	isNoUser: boolean
	desc: string
	type: UserType
	id: string
	user: string
	organisation: string
	languageCode: string
	localeCode: string
	timeZone: string
	categories: string[]
}
