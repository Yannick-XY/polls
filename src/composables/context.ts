
import { RouteLocationNormalized } from 'vue-router'
import { useSessionStore } from '../stores/session.ts'
import { usePreferencesStore } from '../stores/preferences.ts'
import { Logger } from '../helpers/index.ts'


const loadContext = (to: RouteLocationNormalized) => {
	const preferencesStore = usePreferencesStore()
	const sessionStore = useSessionStore()
	sessionStore.setRouter(to)
	sessionStore.load()
	if (sessionStore.userStatus.isLoggedin) {
		preferencesStore.load()
	}
	Logger.debug('Context loaded', {
		'route': to,
		'session': sessionStore.$state,
		'preferences': preferencesStore.$state,
	})
}

export { loadContext }