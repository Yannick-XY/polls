/* jshint esversion: 6 */
/**
 * @copyright Copyright (c) 2021 Rene Gieling <github@dartcafe.de>
 *
 * @author Rene Gieling <github@dartcafe.de>
 *
 * @license  AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * @param {Array} array Array of objects to unify
 */
const uniqueArrayOfObjects = (array) =>
	[...new Set(array.map((obj) => JSON.stringify(obj)))].map((string) => JSON.parse(string))

/**
 * @param {Array} options Array of poll options to unify
 */
const uniqueOptions = (options) =>
	options.filter((option, index, array) =>
		array.findIndex((compare) =>
			(compare.text === option.text)) === index)

/**
 * @param {Array} votes Array of votes to gerneate a unique array of participants from
 */
const uniqueParticipants = (votes) => {
	const participants = votes.map((vote) => ({
		userId: vote.user.userId,
		displayName: vote.user.displayName,
		isNoUser: vote.user.isNoUser,
		user: vote.user,
		pollId: vote.pollId,
	}))
	return uniqueArrayOfObjects(participants)
}

const transformComments = (inputArray) => {
	const idToElement = inputArray.reduce((acc, item) => {
		acc[item.id] = item
		return acc
	}, {})

	const resultArray = inputArray
		.filter((item) => item.parent === 0)
		.sort((a, b) => b.timestamp - a.timestamp)
		.map((parentItem) => {
			const comments = getComments(parentItem.id)

			const sortedComments = comments.sort((a, b) => {
				const elementA = idToElement[a.id]
				const elementB = idToElement[b.id]

				// Verify elementA and elementB are defined
				if (elementA && elementB) {
					// compare timestamps
					if (elementA.timestamp !== elementB.timestamp) {
						return elementB.timestamp - elementA.timestamp
					}

					// sort by id, if timestamps are identical
					return elementB.id - elementA.id
				}

				// otherwise sort by id
				return b.id - a.id
			})

			return {
				...parentItem,
				comments: sortedComments,
			}
		})

	/**
	 *
	 * @param {object} parentId parent comment
	 */
	function getComments(parentId) {
		const comments = []
		const stack = [parentId]

		while (stack.length > 0) {
			const currentId = stack.pop()
			const currentElement = idToElement[currentId]
			comments.push({
				id: currentElement.id,
				comment: currentElement.comment,
				deleted: currentElement.deleted,
			})

			const childIds = inputArray
				.filter((item) => item.parent === currentId)
				.map((item) => item.id)

			stack.push(...childIds)
		}

		return comments
	}

	return resultArray
}

export { uniqueArrayOfObjects, uniqueOptions, uniqueParticipants, transformComments }
