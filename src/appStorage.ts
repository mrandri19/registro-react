// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
// throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
// to avoid the entire page breaking, without having to do a check at each usage of Storage.
// http://stackoverflow.com/questions/21159301/quotaexceedederror-dom-exception-22-an-attempt-was-made-to-add-something-to-st
if (typeof localStorage === "object") {
    try {
        localStorage.setItem("localStorage", "1");
        localStorage.removeItem("localStorage");
    } catch (e) {
        (Storage.prototype as any)._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function () { };
        alert("Your web browser does not support storing settings locally. In Safari, the most common cause of this is using \"Private Browsing Mode\". Some settings may not save or some features may not work properly for you.");
    }
}
export const AppStorage = window.localStorage;
export const LOGGED_KEY = "logged";
export const USERNAME_KEY = "username";
export const SECRET_KEY_KEY = "secret_key";
