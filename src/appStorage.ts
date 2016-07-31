export const AppStorage = window.localStorage;
export const LOGGED_KEY = 'logged';

if(AppStorage.getItem(LOGGED_KEY) == null) {
    AppStorage.setItem(LOGGED_KEY, "false");
}