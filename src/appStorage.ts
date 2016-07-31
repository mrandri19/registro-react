import { store } from './reducer';
import { remember_login } from './actions';

export const AppStorage = window.localStorage;
export const LOGGED_KEY = 'logged';

// Create the key if it isn't in the storage
if(AppStorage.getItem(LOGGED_KEY) == null) {
    AppStorage.setItem(LOGGED_KEY, "false");
} else {
    const logged = AppStorage.getItem(LOGGED_KEY) === "true";
    store.dispatch(remember_login(logged));
}